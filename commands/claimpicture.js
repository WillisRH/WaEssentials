const { MessageTypes, MessageMedia } = require("whatsapp-web.js");

async function handleClaimPicture(client, message) {
    const quotedMessage = await message.getQuotedMessage();
    const quotedmessage = (await message.getQuotedMessage()).body;
    if(!quotedMessage) return  await message.reply('Please reply to a media message with\n\n!mediatake command.');
  
    // Check if the quoted message exists and is a sticker
    if (quotedMessage.type === MessageTypes.IMAGE || quotedMessage.type === MessageTypes.VIDEO) {
      // Download the sticker media
      const media = await quotedMessage.downloadMedia();
  
      // Create a new MessageMedia object with the modified sticker name
      const mediasend = new MessageMedia(media.mimetype, media.data.toString("base64"));
  
      if (message.fromMe) {
        await client.sendMessage(message.to, mediasend, { caption: `*WaEssentials*\n\nCaption: ${quotedmessage}\n\nDocs: https://github.com/WillisRH/WaEssentials\nCreator: @wls_rhtmn`
          });
        return;
      }

      // Send the modified sticker with options
      await client.sendMessage(message.from, mediasend, { caption: `*WaEssentials*\n\nCaption: ${quotedmessage}\n\nDocs: https://github.com/WillisRH/WaEssentials\nCreator: @wls_rhtmn`
      });
    } else {
      // Handle the case when no quoted sticker message is found
      await message.reply('Please reply to a media message with\n\n!mediatake command.');
    }

    // try {
    //   if (quotedMessage.type === MessageTypes.IMAGE || quotedMessage.type === MessageTypes.VIDEO) {
    //     // Download the sticker media
    //     const media = await quotedMessage.downloadMedia();
    
    //     // Create a new MessageMedia object with the modified sticker name
    //     const mediasend = new MessageMedia(media.mimetype, media.data.toString("base64"));
    
    //     if (message.fromMe) {
    //       await client.sendMessage(message.to, mediasend, { caption: `*WaEssentials*\n\nCaption: ${quotedmessage}\n\nDocs: https://github.com/WillisRH/WaEssentials\nCreator: @wls_rhtmn`
    //         });
    //       return;
    //     }
  
    //     // Send the modified sticker with options
    //     await client.sendMessage(message.from, mediasend, { caption: `*WaEssentials*\n\nCaption: ${quotedmessage}\n\nDocs: https://github.com/WillisRH/WaEssentials\nCreator: @wls_rhtmn`
    //     });
    //   } else {
    //     // Handle the case when no quoted sticker message is found
    //     await message.reply('Please reply to a media message with\n\n!mediatake command.');
    //   }
    // } catch (error) {
    //   console.error('Error', error.message);
    //   throw error;
    // }
  }
  





module.exports = handleClaimPicture