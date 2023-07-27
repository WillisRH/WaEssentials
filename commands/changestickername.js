const { MessageTypes, MessageMedia } = require("whatsapp-web.js");

async function changeStickerName(client, message) {
    const quotedMessage = await message.getQuotedMessage();
    const args = message.body.split(' ');
    const stickername = args.slice(1).join(' ');
    if (args.length < 2) {
        message.reply('Please reply to a sticker message with\n\n!changestickername <name>\n!csn <name>');
        return;
    }
  
    // Check if the quoted message exists and is a sticker
    if (quotedMessage && quotedMessage.type === MessageTypes.STICKER) {
      // Download the sticker media
      const media = await quotedMessage.downloadMedia();
  
      // Create a new MessageMedia object with the modified sticker name
      const sticker = new MessageMedia(media.mimetype, media.data.toString("base64"));
  
      // Send the modified sticker with options
      if (message.fromMe) {
        await client.sendMessage(message.to, sticker, {
            sendMediaAsSticker: true,
            stickerAuthor: stickername
          });
        return;
      }
      await client.sendMessage(message.from, sticker, {
        sendMediaAsSticker: true,
        stickerAuthor: stickername
      });
    } else {
      // Handle the case when no quoted sticker message is found
      await message.reply('Please reply to a sticker message with\n\n!changestickername <name>\n!csn <name>');
    }
  }

  async function deleteStickerName(client, message) {
    const quotedMessage = await message.getQuotedMessage();
  
    // Check if the quoted message exists and is a sticker
    if (quotedMessage && quotedMessage.type === MessageTypes.STICKER) {
      // Download the sticker media
      const media = await quotedMessage.downloadMedia();
  
      // Create a new MessageMedia object with the modified sticker name
      const sticker = new MessageMedia(media.mimetype, media.data.toString("base64"));
  
      if (message.fromMe) {
        await client.sendMessage(message.to, sticker, {
            sendMediaAsSticker: true,
            stickerAuthor: "\n"
          });
        return;
      }
      // Send the modified sticker with options
      await client.sendMessage(message.from, sticker, {
        sendMediaAsSticker: true,
        stickerAuthor: "\n"
      });
    } else {
      // Handle the case when no quoted sticker message is found
      await message.reply('Please reply to a sticker message with\n\n!deletestickername\n!dsn');
    }
  }


  async function claimStickerName(client, message) {
    const quotedMessage = await message.getQuotedMessage();
  
    // Check if the quoted message exists and is a sticker
    if (quotedMessage && quotedMessage.type === MessageTypes.STICKER) {
      // Download the sticker media
      const media = await quotedMessage.downloadMedia();
  
      // Create a new MessageMedia object with the modified sticker name
      const sticker = new MessageMedia(media.mimetype, media.data.toString("base64"));
  
      if (message.fromMe) {
        await client.sendMessage(message.to, sticker, {
            sendMediaAsSticker: true,
            stickerAuthor: "WaEssentials\nDocs: https://github.com/WillisRH/StickerToWhatsapp\nCreator: @wls_rhtmn"
          });
        return;
      }

      // Send the modified sticker with options
      await client.sendMessage(message.from, sticker, {
        sendMediaAsSticker: true,
        stickerAuthor: "WaEssentials\nDocs: https://github.com/WillisRH/StickerToWhatsapp\nCreator: @wls_rhtmn"
      });
    } else {
      // Handle the case when no quoted sticker message is found
      await message.reply('Please reply to a sticker message with\n\n!claim\n!claimsticker command.');
    }
  }
  
  

  module.exports = {
    changeStickerName,
    claimStickerName,
    deleteStickerName
  }