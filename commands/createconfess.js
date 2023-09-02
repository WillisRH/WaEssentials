const axios = require('axios'); // Import Axios library for making HTTP requests

async function handleConfessWhatsappCommand(message) {
    const args = message.body.toLowerCase().split(' ');
    if (args.length < 1) {
        return await message.reply('Please provide the confession details using the format: from, to, and message.');
    }


    args.shift();

    const confessionDetails = args.join(' '); // Join all arguments into a single string
    const [from, to, messageContent] = confessionDetails.split(',').map(detail => detail.trim());

    if (!from || !to || !messageContent) {
        return await message.reply('Please provide all three details: from, to, and message.');
    }

    const confessData = {
        from: from,
        to: to,
        message: messageContent
    };

    try {
        const response = await axios.post('http://localhost:2000/new-confess', confessData);
        // console.log(response)
        if (response.status === 200) {
            await message.reply(`Confession posted successfully with id *${response.data.url}*.\n\n_Please contact using !reportbug if you found any issue!_`);
        } else {
            await message.reply('Failed to post confession.');
        }
    } catch (error) {
        console.error('Error posting confession:', error);
        await message.reply('An error occurred while posting the confession.');
    }
}

module.exports = handleConfessWhatsappCommand;