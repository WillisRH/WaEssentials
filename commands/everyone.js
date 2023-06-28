async function handleEveryoneCommand(message, client) {
    const chat = await message.getChat();
    if (!chat.isGroup) return message.reply("Not a group.");
  
    let text = "";
    let mentions = [];
  
    for (let participant of chat.participants) {
      const contact = await client.getContactById(participant.id._serialized);
  
      mentions.push(contact);
      text += `@${participant.id.user} `;
    }
  
    await chat.sendMessage(text, { mentions });
  }
  
  module.exports = handleEveryoneCommand;
  