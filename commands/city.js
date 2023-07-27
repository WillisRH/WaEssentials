const axios = require('axios');

async function getWeatherForecast1(province) {
    try {
      const response = await axios.get(`http://localhost:2112/weather/${province}`);
      const data = response.data;
  
      if (!data.data || !data.data.areas || data.data.areas.length === 0) {
        console.error('Invalid response data:', data);
        throw new Error('City data not available.');
      }
  
      // Loop through the areas and print the description of each city
      const cityDescriptions = data.data.areas.map((cityData) => cityData.description);
  
      return data.data; // Return the data object inside "data" property
    } catch (error) {
      throw error;
    }
  }

  async function handleDebugLokasiCommand(message) {
    const args = message.body.split(' ');
    const province = args[1];
  
    try {
      const weatherForecast = await getWeatherForecast1(province);
      const cityDescriptions = weatherForecast.areas.map((city) => city.description).join('\n');
      await message.reply(`Here is the city list from ${province} province:\n\n${cityDescriptions}`);
    } catch (error) {
      await message.reply('Error fetching weather data. Please try again later.');
    }
  }

  module.exports = handleDebugLokasiCommand