async function handleHelpCommand(message) {
    const commands = [
      '*!aboutgroup* - Get information about the group.\n',
      '*!block* - Block a contact (Bug).\n',
      '*!everyone* - Tag everyone in the group.\n',
      '*!help* - Show available commands.\n',
      '*!status* - Change status between online and busy.\n',
      '*!stickercreate/!sc* - Create a sticker.\n',
      '*!uptime* - Show bot uptime.\n',
      '*!prefix* - Show current prefix.\n'
    ];
  
    const commandList = commands.join('\n');
  
    const replyMessage = `${commandList}`;
  
    await message.reply(replyMessage);
  }
  

module.exports = handleHelpCommand