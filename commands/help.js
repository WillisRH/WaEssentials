async function handleHelpCommand(message) {
  const commands = [
    '**Available Commands:**\n\n',
    '- `!aboutgroup` - Get information about the group.\n',
    '- `!block` - Block a contact (Admin only).\n',
    '- `!everyone` - Tag everyone in the group.\n',
    '- `!help` - Show available commands.\n',
    '- `!status` - Change status between online and busy (Admin only).\n',
    '- `!stickercreate`/`!sc` - Create a sticker.\n',
    '- `!uptime` - Show bot uptime (Admin only).\n',
    '- `!prefix` - Show current prefix (Admin only).\n',
    '- `!translate <language> <word>` - Translate a word into another language.\n',
    '- `!changestickername <name>` - Change sticker name.\n',
    '- `!deletestickername` - Delete sticker name.\n',
    '- `!gempa` - Latest earthquakes.\n',
    '- `!cuaca` - Check current and tomorrow\'s weather.\n',
    '- `!mediatake` - Take media (Admin only).\n',
    '- `!createconfess <from>, <to>, <message>` - Share your feelings anonymously.\n',
    '- `!confesslist` - View all confessions.\n',
    '- `!postconfess` - Post a confession to Instagram.\n',
    '- `!deleteconfess` - Delete a confession.\n'
  ];
  
  
    const commandList = commands.join('\n');
  
    const replyMessage = `${commandList}`;
  
    await message.reply(replyMessage);
  }
  

module.exports = handleHelpCommand