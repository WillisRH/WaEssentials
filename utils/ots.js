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
        const contactn = contact.id.user;
  
        // Convert the media data to a Buffer
        const buff = Buffer.from(media.data, 'base64');
        // Save the Buffer to a file with .jpg extension
        const filePath = path.join(downloadedFolder, `${contactn}_${name}_${Date.now()}.jpg`);
        fs.writeFileSync(filePath, buff);
  
        // console.log(`Media saved to ${filePath} [${new Date().toLocaleTimeString()}] \n`);
  
      }
    }
  }

  function renderGallery(req, res, waconnected) {
    fs.readdir(downloadedFolder, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred.\n");
      } else {
        // Filter image and video files
        const supportedExtensions = [".jpg", ".mp4", ".mp3"];
        const mediaFiles = files.filter((file) =>
          supportedExtensions.includes(path.extname(file))
        );
  
        // Render the "gallery" EJS template and pass the media file names as data
        res.render("gallery", { files: mediaFiles, connected: waconnected });
      }
    });
  }

  function redirectVideo(req, res) {
    const { filename } = req.params;
  const filePath = path.join(downloadedFolder, filename);

  // Stream the video file
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range || 'bytes=0-';
  const parts = range.replace(/bytes=/, '').split('-');
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': end - start + 1,
    'Content-Type': 'video/mp4',
  });

  const stream = fs.createReadStream(filePath, { start, end });
  stream.pipe(res);
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

async function handleOtsVideo(message) {
  if (message.hasMedia) {
    if (message.isStatus || message.type == MessageTypes.STICKER) return;
    if (message.body.toLowerCase().startsWith('!sc') || message.body.toLowerCase().startsWith('!stickercreate')) return;

    const media = await message.downloadMedia();
    if (media && media.mimetype && media.mimetype.startsWith("video/")) {
      const contact = await message.getContact();
      const name = contact.pushname;
      const contactn = contact.id.user;

      // Convert the media data to a Buffer
      const buff = Buffer.from(media.data, 'base64');
      // Save the Buffer to a file with .mp4 extension
      const filePath = path.join(downloadedFolder, `${contactn}_${name}_${Date.now()}.mp4`);
      fs.writeFileSync(filePath, buff);

      // console.log(`Video saved to ${filePath} [${new Date().toLocaleTimeString()}] \n`);

    } 
  }
}


async function handleOtsAudio(message) {
  if (message.hasMedia) {
    if (message.isStatus || message.type == MessageTypes.STICKER) return;

    const media = await message.downloadMedia();
    if (media && media.mimetype && media.mimetype.startsWith("audio/")) {
      const contact = await message.getContact();
      const name = contact.pushname;
      const contactn = contact.id.user;

      // Convert the media data to a Buffer
      const buff = Buffer.from(media.data, 'base64');
      // Save the Buffer to a file with .mp4 extension
      const filePath = path.join(downloadedFolder, `${contactn}_${name}_${Date.now()}.mp3`);
      fs.writeFileSync(filePath, buff);

      // console.log(`Video saved to ${filePath} [${new Date().toLocaleTimeString()}] \n`);

    } 
  }
}


  module.exports = {
    handleOtsMessage,
    recreateFolder,
    createDownloadedFolder,
    renderGallery,
    renderDelete,
    handleOtsVideo,
    redirectVideo,
    handleOtsAudio
  };
  