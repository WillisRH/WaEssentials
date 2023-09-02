const axios = require('axios'); // Import Axios library for making HTTP requests

async function handlePostCommand(message) {
    const args = message.body.toLowerCase().split(' ');

    if (args.length < 2) {
        return await message.reply('Please provide the confession ID.');
    }

    const confessionId = parseInt(args[1]); // Parse the ID as an integer

    try {
        const response = await axios.post('http://localhost:2000/get-all-data');
        const confessData = response.data.confesses.find(confess => confess.id === confessionId);

        if (!confessData) {
            return await message.reply(`Confession with ID *${confessionId}* not found.`);
        }

        const postData = {
            id: confessData.id,
            from: confessData.from,
            to: confessData.to,
            message: confessData.message
        };

        const postResponse = await axios.post('http://localhost:2000/create-image-and-post', postData);

        if (postResponse.status === 200) {
            await message.reply(`Confession with ID *${confessionId}* posted successfully.`);
        } else {
            await message.reply(`Failed to post confession with ID *${confessionId}*.`);
        }
    } catch (error) {
        console.error('Error posting confession:', error);
        await message.reply(`An error occurred while posting the confession with ID *${confessionId}*.`);
        return;
    }
}




module.exports = handlePostCommand;