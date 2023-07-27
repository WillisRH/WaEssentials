async function handleStatusCommand(message, client, status) {
    const args = message.body.toLowerCase().split(' ');
  
    if (args.length === 1) {
      // No arguments provided, send the current status
      if (status == "vanish") return status = 'vanish';
      await message.reply(`Current status: ${status}`);
    } else {
      // Set the status based on the argument
      const requestedStatus = args[1].toLowerCase();
      if (requestedStatus === 'online') {
        status = 'online';
        await message.reply('Status updated to online.');
      } else if (requestedStatus === 'busy') {
        status = 'busy';
        await message.reply('Status updated to busy.');

      } else if (requestedStatus === 'vanish') {
        status = 'vanish';
        await message.reply('Status updated to vanish.');

      } else if (requestedStatus === 'school') {
        status = 'school';
        await message.reply('Status updated to school.');

      }
      
      else {
        await message.reply('Invalid status. Please use either "online", "busy", "vanish", "school"');
      }
    }
  
    return status;
  }
  
  module.exports = handleStatusCommand;
  