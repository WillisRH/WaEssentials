const { confess } = require("../utils/database");
const axios = require('axios'); // Import Axios library for making HTTP requests

async function handleConfessCommand(message) {
    try {
        const response = await axios.post('http://localhost:2000/get-all-data');
        const confessh = response.data.confesses;

        if (confessh.length === 0) {
            return await message.reply('No one submitted any confess yet.');
        }

        let messageToSend = `*${confessh.length}* Data ditemukan!\n\n`;
        for (const confessg of confessh) {
            messageToSend += `ID: *${confessg.id}*\n`;
            messageToSend += `From: *${confessg.from}*\n`;
            messageToSend += `To: *${confessg.to}*\n`;
            messageToSend += `Message: ${confessg.message}\n\n`;
        }

        await message.reply(messageToSend + '©express-autopost-ig by mvfflin & wls_rhtmn.');
    } catch (error) {
        console.error('Error fetching confess data:', error);
        await message.reply('An error occurred while fetching confess data.');
    }
}

module.exports = handleConfessCommand;