const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require("path");
const axios = require("axios");
// const qrcode = require('qrcode-terminal');
require('dotenv').config();

const handleEveryoneCommand = require('./commands/everyone');
const handleHelpCommand = require('./commands/help');
const handleStatusCommand = require('./commands/status');
const handleAboutGroupCommand = require('./commands/aboutgroup');
const handleCall = require('./utils/call');
const handleBlockCommand = require('./commands/block');
const handleTranslateCommand = require('./commands/translate');
const handlePromoteAdminCommand = require('./commands/promoteadmin');
const handleUptimeCommand = require('./commands/uptime')
const handleStickercreateCommand = require('./commands/stickercreate')
const { handleAuthentication, handleQRCode } = require('./utils/authHandler');
const { renderHomePage, handleStatusForm, renderChatlistPage, saveChatData, renderErrorPage } = require('./utils/routes');
const { handleOtsMessage, recreateFolder, createDownloadedFolder, renderGallery, renderDelete, handleOtsVideo, redirectVideo, handleOtsAudio } = require('./utils/ots');
const { connectToDatabase } = require('./utils/mysql');
const { changeStickerName, deleteStickerName, claimStickerName } = require('./commands/changestickername');
const ffmpeg = require('fluent-ffmpeg');
const handleGempaTerkiniCommand = require('./commands/gempa');
const handleCuacaCommand = require('./commands/cuaca');
const handleDebugLokasiCommand = require('./commands/city');

const app = express();
const port = 2111;

// Initialize the WhatsApp client
const client = new Client({
  restartOnAuthFail: true,
  authStrategy: new LocalAuth(),
  puppeteer: {
		args: [ '--no-sandbox', '--disable-setuid-sandbox' ],
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
	},
  ffmpegPath: 'C:\\ffmpeg\\bin\\ffmpeg.exe'
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
setInterval(recreateFolder, 10800000);

const admins = process.env.ADMIN.split(",").map(admin => admin.trim()); // Split the ADMIN variable by comma and trim the values

function isUserAdmin(senderNumber) {
  return admins.includes(senderNumber);
}

/**
 * Message Handler
 */



client.on('message_create', async (message) => {
  const senderNumber = message.from;
  const isAdmin = isUserAdmin(senderNumber)
  const messagecommand = message.body.toLowerCase();
  const chat = await message.getChat();

  // everyone
  if (messagecommand.startsWith(prefix + 'everyone')) {
    if (status == "vanish") return;
    await handleEveryoneCommand(message, client);
  }

  // status
  else if (messagecommand.startsWith(prefix + 'status')) {
    if (message.body.split(' ').length > 1 && !isAdmin) {
      if (status == "vanish") return;
      await message.reply("You are not authorized to use this command with arguments!");
      return;
    }
  
    
    status = await handleStatusCommand(message, client, status);
  }

  // aboutgroup
  else if (messagecommand.startsWith(prefix + 'aboutgroup')) {
    if (status == "vanish") return;
    await handleAboutGroupCommand(message, client);
  }

  // block
  else if (messagecommand.startsWith(prefix + 'block')) {
    if (!isAdmin) {
      if (status == "vanish") return;
      await message.reply("You are not authorized to use this command!");
      return;
    }
    // await handleBlockCommand(message, client);
    await message.reply("You can't use this command due a bug!")
  }

  // uptime
  else if (messagecommand.startsWith(prefix + 'uptime')) {
    if (!isAdmin) {
      if (status == "vanish") return;
      await message.reply("You are not authorized to use this command!");
      return;
    }
    await handleUptimeCommand(message, client, startTime)
  }

  // sc/statuscreate
  else if (messagecommand.startsWith(prefix + 'sc') || 
  messagecommand.startsWith(prefix + 'stickercreate')) {
    if (status == "vanish") return;
    // if (!isAdmin) {
    //   await message.reply("You are not authorized to use this command!");
    //   return;
    // }
    await handleStickercreateCommand(message, client)
  }

  // help
  else if (messagecommand.startsWith(prefix + 'help')) {
    if (status == "vanish") return;
    await handleHelpCommand(message)
  }

  // bokep
  else if (messagecommand.startsWith(prefix + 'bokep')) {
    if (isAdmin) return await message.reply("Kumpulan website bokep:\n\n*1.PornHub*\n*2.nHentai*\n*3.HentaiEnvy*\n*4.BokepIndonesia*\n*5.UkDevilz*")

    if (status == "vanish") return;
    await message.reply(`Kumpulan website bokep:\n\n*Astaghfirullah, tobat mas, kiamat sebentar lagi.*`)
  }

  // prefix
  else if (messagecommand.startsWith(prefix + 'prefix') || messagecommand.startsWith('!prefix')) {
    if (status == "vanish") return;
    await message.reply(`*Prefix Settings* (Beta)\n\nDefault prefix: !\nCurrent prefix: ${prefix}`)
  }
  // else if (messagecommand.startsWith(prefix + 'promoteadmin')) {
  //   if (!isAdmin) {
  //     await message.reply('You are not authorized to use this command.');
  //     return;
  //   }

  //   // Call the handlePromoteAdminCommand function
  //   await handlePromoteAdminCommand(message);
  // }
  else if (messagecommand.startsWith(prefix + 'translate')) {
    if (status == "vanish") return;
    await handleTranslateCommand(message);
  }

  else if (messagecommand.startsWith(prefix + 'changestickername')||
  messagecommand.startsWith(prefix + 'csn')) {
    if (status == "vanish") return;
    await changeStickerName(client, message);
  }
  else if (messagecommand.startsWith(prefix + 'deletestickername')||
  messagecommand.startsWith(prefix + 'dsn')) {
    if (status == "vanish") return;
    await deleteStickerName(client, message)
  }

  else if (messagecommand.startsWith(prefix + 'claim')||
  messagecommand.startsWith(prefix + 'claimsticker')) {
    if (!isAdmin) {
      if (status == "vanish") return;
      await message.reply("You are not authorized to use this command!");
      return;
    }
    await claimStickerName(client, message)
  }

  else if (messagecommand.startsWith(prefix + 'gempaterkini') || messagecommand.startsWith(prefix + 'gempa')) {
    if (status == "vanish") return;
    await handleGempaTerkiniCommand(message, client)
  }

  else if (messagecommand.startsWith(prefix + 'cuaca')) {
    if (status == "vanish") return;
    await handleCuacaCommand(message)
  }

  else if (messagecommand.startsWith(prefix + 'bmkgloc')) {
    if (status == "vanish") return;
    await handleDebugLokasiCommand(message)
  }

  const media = await message.downloadMedia();
  // console.log(media.mimetype)
  handleOtsMessage(message);
  handleOtsVideo(message);
  handleOtsAudio(message);
  // saveChatData(message)
});

/**
 * Express
 */


app.get('/chathistory', (req, res) => {
  renderChatlistPage(req, res)
});

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

app.get('/gallery/:filename', (req, res) => {
  redirectVideo(req, res)
});

app.get('/remove-image/:filename', (req, res) => {
  renderDelete(req, res)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// connectToDatabase();

/**
 * Auth
 */

client.on('authenticated', handleAuthentication);

// Event listener for QR code generation
client.on('qr', handleQRCode);

client.on("ready", () => {
  startTime = new Date();
  waconnected = true;
  console.log('Platform:', client.info.platform);
});

// Start the WhatsApp client and server
client.initialize();
