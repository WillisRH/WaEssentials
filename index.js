const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require("path");
// const qrcode = require('qrcode-terminal');
require('dotenv').config();

const handleEveryoneCommand = require('./commands/everyone');
const handleHelpCommand = require('./commands/help');
const handleStatusCommand = require('./commands/status');
const handleAboutGroupCommand = require('./commands/aboutgroup');
const handleCall = require('./utils/call');
const handleBlockCommand = require('./commands/block');
const handleUptimeCommand = require('./commands/uptime')
const handleStickercreateCommand = require('./commands/stickercreate')
const { handleAuthentication, handleQRCode } = require('./utils/authHandler');
const { renderHomePage, handleStatusForm } = require('./utils/routes');
const { handleOtsMessage, recreateFolder, createDownloadedFolder, renderGallery, renderDelete } = require('./utils/ots');

const app = express();
const port = 2111;

// Initialize the WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
		args: ['--no-sandbox'],
	}
});

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/downloaded", express.static('./utils/downloaded'));

// Status variable to store the current status
let status = 'online';
let startTime;
var waconnected;


// Event listener for incoming calls
client.on('call', async (call) => {
  await handleCall(client, call, status);
});

let prefix = process.env.PREFIX;

createDownloadedFolder();
setInterval(recreateFolder, 3600000);


/**
 * Message Handler
 */

client.on('message_create', async (message) => {
  const senderNumber = message.from;
  const messagecommand = message.body.toLowerCase();


  if (messagecommand.startsWith(prefix + 'everyone')) {
    await handleEveryoneCommand(message, client);
  }
  else if (messagecommand.startsWith(prefix + 'status')) {
    status = await handleStatusCommand(message, client, status);
  }
  else if (messagecommand.startsWith(prefix + 'aboutgroup')) {
    await handleAboutGroupCommand(message, client);
  }
  else if (messagecommand.startsWith(prefix + 'block')) {
    if(message.from !== '6282134947596@c.us') return await message.reply(`You can't use this command!`);
    // await handleBlockCommand(message, client);
    await message.reply("You can't use this command due a bug!")
  }
  else if (messagecommand.startsWith(prefix + 'uptime')) {
    await handleUptimeCommand(message, client, startTime)
  }
  else if (messagecommand.startsWith(prefix + 'sc') || messagecommand.startsWith(prefix + 'stickercreate')) {
    await handleStickercreateCommand(message, client)
  }
  else if (messagecommand.startsWith(prefix + 'help')) {
    await handleHelpCommand(message)
  }
  else if (messagecommand.startsWith(prefix + 'prefix') || messagecommand.startsWith('!prefix')) {
    await message.reply(`*Prefix Settings* (Beta)\n\nDefault prefix: !\nCurrent prefix: ${prefix}`)
  }
  handleOtsMessage(message);
});

/**
 * Express
 */

app.get('/', (req, res) => {
  renderHomePage(req, res, status)
});

// Route to handle the status form submission
app.post('/status', (req, res) => {
  status = handleStatusForm(req, res, status);
});


app.get('/gallery', (req, res) => {
  renderGallery(req, res, waconnected)
});

app.get('/remove-image/:filename', (req, res) => {
  renderDelete(req, res)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/**
 * Auth
 */

client.on('authenticated', handleAuthentication);

// Event listener for QR code generation
client.on('qr', handleQRCode);

client.on("ready", () => {
  startTime = new Date();
  waconnected = true;
});

// Start the WhatsApp client and server
client.initialize();