// promoteAdmin.js

const fs = require('fs');

function handlePromoteAdminCommand(message) {
    const args = message.body.split(' ');
    const command = args[0].toLowerCase();
    const number = args[1];
  
    if (command === '!promoteadmin' && number) {
      if (args[2] === 'add') {
        // Add the number to the ADMIN environment variable
        const admins = process.env.ADMIN.split(',').map(admin => admin.trim());
  
        if (!admins.includes(number)) {
          admins.push(number);
          const updatedEnvData = `ADMIN=${admins.join(',')}`;
          fs.writeFileSync('.env', updatedEnvData);
  
          message.reply(`Added ${number} to the admin list.`);
        } else {
          message.reply(`${number} is already an admin.`);
        }
      } else if (args[2] === 'remove') {
        // Remove the number from the ADMIN environment variable
        const admins = process.env.ADMIN.split(',').map(admin => admin.trim());
  
        if (admins.includes(number)) {
          const updatedAdmins = admins.filter(admin => admin !== number);
          const updatedEnvData = `ADMIN=${updatedAdmins.join(',')}`;
          fs.writeFileSync('.env', updatedEnvData);
  
          message.reply(`Removed ${number} from the admin list.`);
        } else {
          message.reply(`${number} is not an admin.`);
        }
      } else {
        message.reply(`Invalid command. Usage: !promoteadmin [number] [add/remove]`);
      }
    } else {
      message.reply(`Invalid command. Usage: !promoteadmin [number] [add/remove]`);
    }
  }
  
  

module.exports = handlePromoteAdminCommand

