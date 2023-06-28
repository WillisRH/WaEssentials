//bugged


async function handleBlockCommand(message, client) {
    const chat = await message.getChat();
    if (chat.isGroup) return message.reply("Not a private chat!");
  
    // Get the phone number to block
    const phoneNumber = message.to;
  
    // Get the contact using the phone number
    const contact = await client.getContactById(phoneNumber);
  
    // if (!contact) {
    //   // If the contact is not found, send a response indicating the failure to block
    //   await client.sendMessage(message.from, `Failed to block ${phoneNumber}`);
    //   return;
    // }
  
    // Block the contact
    try {
      await contact.block();
      // Send a response to confirm the blocking
      await client.sendMessage(message.from, `Blocked ${phoneNumber}`);
    } catch (error) {
      console.error(`Error blocking contact: ${error}`);
      await client.sendMessage(message.from, `Failed to block ${phoneNumber}`);
    }
  }
  
module.exports = handleBlockCommand
