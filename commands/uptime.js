const moment = require('moment');

async function handleUptimeCommand(message, client, startTime) {
    // Calculate the uptime
    const uptime = moment.duration(moment().diff(startTime));

    // Format the uptime string
    const formattedUptime = formatUptime(uptime);

    // Send the uptime response
    message.reply(`Bot uptime: ${formattedUptime}`);
}

function formatUptime(uptime) {
  const days = Math.floor(uptime.asDays());
  const hours = uptime.hours();
  const minutes = uptime.minutes();
  const seconds = uptime.seconds();

  let formattedUptime = '';
  if (days > 0) {
    formattedUptime += `${days} days `;
  }
  if (hours > 0) {
    formattedUptime += `${hours} hours `;
  }
  if (minutes > 0) {
    formattedUptime += `${minutes} minutes `;
  }
  if (seconds > 0) {
    formattedUptime += `${seconds} seconds`;
  }

  return formattedUptime;
}

module.exports = handleUptimeCommand

