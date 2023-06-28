const { MessageTypes, MessageMedia } = require("whatsapp-web.js");

async function handleStickercreateCommand(message, client) {
    if (message.hasMedia) {
        if (message.type !== MessageTypes.IMAGE) return;
        const media = await message.downloadMedia();
  
        if (media.mimetype.startsWith("image/")) {
          const sticker = new MessageMedia(media.mimetype, media.data.toString("base64"));
          if(message.fromMe) {
            await client.sendMessage(message.to, sticker, { sendMediaAsSticker: true, stickerAuthor: "WaEssentials\nDocs: https://github.com/WillisRH/StickerToWhatsapp\nCreator: @wls_rhtmn" });
            // await client.sendMessage(message.to, "Enjoy your sticker!");
            return;
          }
  
          await client.sendMessage(message.from, sticker, { sendMediaAsSticker: true, stickerAuthor: "WaEssentials\nDocs: https://github.com/WillisRH/StickerToWhatsapp\nCreator: @wls_rhtmn" });
          // await client.sendMessage(message.from, "Enjoy your sticker!");
        } else {
          await message.reply("Please send an image file.");
        }
      } else {
        await message.reply("Please send an image file.");
      }
}

module.exports = handleStickercreateCommand