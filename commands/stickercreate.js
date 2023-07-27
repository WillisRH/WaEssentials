const { MessageTypes, MessageMedia } = require("whatsapp-web.js");

// async function handleStickercreateCommand(message, client) {
//   const args = message.body.split(' ');
//   const stickername = args.slice(1).join(' ');
//     if (message.hasMedia) {
//         if (message.type !== MessageTypes.IMAGE) return;
//         const media = await message.downloadMedia();
  
//         if (media.mimetype.startsWith("image/")) {
//           const sticker = new MessageMedia(media.mimetype, media.data.toString("base64"));
//           if(message.fromMe) {
//             await client.sendMessage(message.to, sticker, { sendMediaAsSticker: true, stickerAuthor: "WaEssentials\nDocs: https://github.com/WillisRH/StickerToWhatsapp\nCreator: @wls_rhtmn" });
//             // await client.sendMessage(message.to, "Enjoy your sticker!");
//             return;
//           }
  
//           await client.sendMessage(message.from, sticker, { sendMediaAsSticker: true, stickerAuthor: "WaEssentials\nDocs: https://github.com/WillisRH/StickerToWhatsapp\nCreator: @wls_rhtmn" });
//           // await client.sendMessage(message.from, "Enjoy your sticker!");
//         } else {
//           await message.reply("Please send an image file.");
//         }
//       } else {
//         await message.reply("Please send an image file.");
//       }
// }

const axios = require('axios');

async function createStickerFromURL(url) {
  // Implement the logic to download the image from the URL and convert it to a sticker
  // You may use libraries like axios to make an HTTP request to the URL and process the image data
  // For simplicity, we'll assume that this function returns the sticker in base64 format.
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const mediaType = response.headers['content-type'];
  const mediaData = Buffer.from(response.data, 'binary').toString('base64');
  // console.log(mediaData)
  return new MessageMedia(mediaType, mediaData, { unsafeMime: true });
  // return new MessageMedia('image/png', mediaData);
}

const fs = require('fs');
const path = require('path');

const tempFolderPath = './temp_media';

// Create the temporary folder if it doesn't exist
if (!fs.existsSync(tempFolderPath)) {
  fs.mkdirSync(tempFolderPath);
}

// async function createStickerFromURL(url) {
//   // Make an HTTP request to the URL to get the media data
//   const response = await axios.get(url, { responseType: 'arraybuffer' });
//   const mediaType = response.headers['content-type'];
//   const mediaData = Buffer.from(response.data, 'binary');

//   // Determine the appropriate file extension based on media type
//   let fileExtension;
//   if (mediaType === 'image/png') {
//     fileExtension = '.png';
//   } else if (mediaType === 'image/gif' || mediaType.startsWith('video/')) {
//     fileExtension = '.mp4';
//   } else {
//     throw new Error('Unsupported media type');
//   }

//   // Create a temporary file to store the media data with the correct file extension
//   const tempFilePath = path.join(tempFolderPath, `temp_media_${Date.now()}${fileExtension}`);
//   fs.writeFileSync(tempFilePath, mediaData);

//   // Return the MessageMedia object created from the temporary file
//   const sticker = await MessageMedia.fromFilePath(tempFilePath);
//   fs.unlinkSync(tempFilePath); // Remove the temporary file

//   return sticker;
// }



async function handleStickercreateCommand(message, client) {
  const args = message.body.split(' ');
  const stickername = args.slice(1).join(' ');
  const stickername2 = args.slice(2).join(' ');

  if (!message.hasMedia) {
    // Check if the message text starts with "https://"
    if (args[1]?.startsWith("https://")) {
      try {
        // Create a sticker from the provided URL
        const sticker = await createStickerFromURL(args[1]);
        // Determine the recipient based on whether the message is from the sender or not
        const recipient = message.fromMe ? message.to : message.from;

        if (args.length < 3) {
          // Send the sticker with default stickerAuthor
          await client.sendMessage(recipient, sticker, {
            sendMediaAsSticker: true,
            stickerAuthor: "WaEssentials\nDocs: https://github.com/WillisRH/StickerToWhatsapp\nCreator: @wls_rhtmn"
          });
        } else {
          // if(!isUserAdmin(message.from)) return await message.reply("You are not authorized to use this command with arguments!");
          // Send the sticker with custom stickerAuthor
          await client.sendMessage(recipient, sticker, {
            sendMediaAsSticker: true,
            stickerAuthor: stickername2
          });
        }
      } catch (error) {
        console.error("Error creating sticker from URL:", error);
        await message.reply("Failed to create sticker from the provided URL.");
      }
    } else {
      // If no media and the message doesn't start with "https://", reply with an appropriate message
      await message.reply("Please provide an image file or a valid image URL (starting with 'https://').");
    }
  } else if (message.type === MessageTypes.IMAGE || message.type === MessageTypes.VIDEO || message.type == "gif") {
    const media = await message.downloadMedia();
    // if (media.mimetype.startsWith("image/")) {
      if (args.length < 2) {
        // Create a sticker from the media data with default stickerAuthor
        const sticker = new MessageMedia(media.mimetype, media.data.toString("base64"));
        // Determine the recipient based on whether the message is from the sender or not
        const recipient = message.fromMe ? message.to : message.from;
        // Send the sticker
        await client.sendMessage(recipient, sticker, {
          sendMediaAsSticker: true,
          stickerAuthor: "WaEssentials\nDocs: https://github.com/WillisRH/StickerToWhatsapp\nCreator: @wls_rhtmn"
        });
      } else {
        // Create a sticker from the media data with custom stickerAuthor
        const sticker = new MessageMedia(media.mimetype, media.data.toString("base64"));
        // Determine the recipient based on whether the message is from the sender or not
        const recipient = message.fromMe ? message.to : message.from;
        // Send the sticker

        // if(!isUserAdmin(message.from)) return await message.reply("You are not authorized to use this command with arguments!");

        await client.sendMessage(recipient, sticker, {
          sendMediaAsSticker: true,
          stickerAuthor: stickername
        });
      }
    // } else {
    //   await message.reply("Please send an image file.");
    // }
  } else {
    await message.reply("Please send an image file or a valid image URL (starting with 'https://').");
  }
}


module.exports = handleStickercreateCommand