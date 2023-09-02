const axios = require('axios'); // Import Axios library for making HTTP requests

async function handleDeleteConfess(message) {
    const args = message.body.toLowerCase().split(' ');

    if (args.length < 1) {
        return await message.reply('Please provide the confession ID after "id".');
    }

    const action = args[1]; // Get the action ("all" or "id")
    const confessionId = parseInt(args[2]);

    if (action === 'all') {
        try {
            const response = await axios.post('http://localhost:2000/delete-all-confess');
            if (response.status === 200) {
                await message.reply('All confess data deleted successfully.');
            } else {
                await message.reply('Failed to delete all confess data.');
            }
        } catch (error) {
            console.error('Error deleting all confess data:', error);
            await message.reply('An error occurred while deleting all confess data.');
        }
    } else if (action === 'id' && !isNaN(confessionId)) { // Check if action is "id" and ID is a number
        try {
            const data = await axios.post('http://localhost:2000/get-all-data');
        const confessData = data.data.confesses.find(confess => confess.id === confessionId);

        if (!confessData) {
            return await message.reply(`Confession with ID *${confessionId}* not found.`);
        }
            const response = await axios.post('http://localhost:2000/delete-confess', { id: confessionId });

            if (response.status === 200) {
                return await message.reply(`Confession with ID *${confessionId}* deleted successfully.`);
            } 
        } catch (error) {
            await message.reply(`An error occurred while deleting the confession with ID *${confessionId}*.`);
        }
    } else {
        await message.reply('Invalid action. Please provide a valid ID or "all".');
    }
}

module.exports = handleDeleteConfess;