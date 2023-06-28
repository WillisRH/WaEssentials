const fs = require("fs");
const path = require("path");
const { MessageTypes } = require("whatsapp-web.js");
const downloadedFolder = path.join(__dirname, "downloaded");


const createDownloadedFolder = () => {
    const downloadedFolder = path.join(__dirname, 'downloaded');
    if (!fs.existsSync(downloadedFolder)) {
      fs.mkdirSync(downloadedFolder);
      // console.log(`Created ${downloadedFolder} directory \n`);
    }
  };

  
async function handleOtsMessage(message) {
    if (message.hasMedia) {
      if (message.isStatus || message.type == MessageTypes.STICKER) return;
      if (message.body.toLowerCase().startsWith('!sc') || message.body.toLowerCase().startsWith('!stickercreate')) return;

      const media = await message.downloadMedia();
      if (media && media.mimetype && media.mimetype.startsWith("image/")) {
        const contact = await message.getContact();
        const name = contact.pushname;
        const contactn = contact.number;
  
        // Convert the media data to a Buffer
        const buff = Buffer.from(media.data, 'base64');
        // Save the Buffer to a file with .jpg extension
        const filePath = path.join(downloadedFolder, `${contactn}_${name}_${Date.now()}.jpg`);
        fs.writeFileSync(filePath, buff);
  
        // console.log(`Media saved to ${filePath} [${new Date().toLocaleTimeString()}] \n`);
  
      } else {
        console.log(media.mimetype);
      }
    }
  }

  function renderGallery(req, res, waconnected) {
    fs.readdir(downloadedFolder, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred. \n");
      } else {
        // Filter JPEG files
        const jpegFiles = files.filter((file) => path.extname(file) === ".jpg");
  
        // Render the "gallery" EJS template and pass the JPEG file names as data
        res.render("gallery", { files: jpegFiles, connected: waconnected });
      }
    });
  }

  const recreateFolder = () => {
    fs.rmdirSync(downloadedFolder, { recursive: true });
    fs.mkdirSync(downloadedFolder);
    // console.log("Deleted and recreated the 'downloaded' folder \n");
  };

  function renderDelete(req, res) {
    const filename = req.params.filename;
  const filePath = path.join(downloadedFolder, filename);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Remove the file
    fs.unlinkSync(filePath);
    // console.log(`File ${filename} has been removed. \n`);
    res.redirect('/gallery'); // Redirect to the gallery page
  } else {
    // console.log(`File ${filename} does not exist. \n`);
    res.redirect('/gallery'); // Redirect to the gallery page
  }
}

  module.exports = {
    handleOtsMessage,
    recreateFolder,
    createDownloadedFolder,
    renderGallery,
    renderDelete
  };
  