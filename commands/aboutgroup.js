async function handleAboutGroupCommand(message, client) {
    const chat = await message.getChat();
    if (chat.isGroup) {
      const groupInfo = `Group Name: ${chat.name}\nGroup Description: ${chat.description}\nCreation Date: ${chat.createdAt}\nMember Count: ${chat.participants.length}`;
  
      // Check if the group has a profile picture
        // Retrieve the group picture thumbnail URL
        const profilePicUrl = await client.getProfilePicUrl(chat.id._serialized);
        const groupPicInfo = `*Group Description*\n\n${groupInfo}\n\nGroup Picture: ${profilePicUrl}`;
  
        // Send the group information with the picture
        await message.reply(groupPicInfo);
    
      
  
      // Check if the member count is less than 5
      if (chat.participants.length < 10) {
        let participantNames = 'Participants: ';
        for (let participant of chat.participants) {
          const contact = await client.getContactById(participant.id._serialized);
          participantNames += `\n- ${contact.pushname}`;
        }
        await message.reply(participantNames);
      }
    } else {
      await message.reply('This is not a group chat.');
    }
  }
  
  module.exports = handleAboutGroupCommand;
  