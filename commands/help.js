async function handleHelpCommand(message) {
    const commands = [
      '*!aboutgroup* - Get information about the group.\n',
      '*!block* - Block a contact (Bug). <admin>\n',
      '*!everyone* - Tag everyone in the group.\n',
      '*!help* - Show available commands.\n',
      '*!status* - Change status between online and busy. <admin>\n',
      '*!stickercreate/!sc* - Create a sticker.\n',
      '*!uptime* - Show bot uptime. <admin>\n',
      '*!prefix* - Show current prefix. <admin>\n',
      '*!translate <language> <word>* - Translate a word into another language.\n',
      '*!changestickername <name>* - Change sticker whatever you want.\n',
      '*!deletestickername* - Delete sticker name.\n',
      '*!claim* - Claiming a sticker.'
    ];
  
    const commandList = commands.join('\n');
  
    const replyMessage = `${commandList}`;
  
    await message.reply(replyMessage);
  }
  

module.exports = handleHelpCommand