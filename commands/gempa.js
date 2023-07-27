const axios = require('axios');
const { parseStringPromise } = require('xml2js');

async function getLatestEarthquakes() {
  try {
    const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml');
    const xmlData = response.data;

    // Parse the XML data using xml2js
    const jsonData = await parseStringPromise(xmlData, { explicitArray: false });
    const earthquakeData = jsonData.Infogempa.gempa;
    return earthquakeData;
  } catch (error) {
    console.error('Error fetching earthquake data:', error.message);
    throw error;
  }
}




async function handleGempaTerkiniCommand(message) {
    try {
      const earthquakeData = await getLatestEarthquakes();
  
      let messageToSend = 'Gempa terkini:\n';
      for (const gempa of earthquakeData) {
        messageToSend += `Tanggal: ${gempa.Tanggal} ${gempa.Jam}\n`;
        messageToSend += `Lokasi: ${gempa.Lintang} ${gempa.Bujur}\n`;
        messageToSend += `Kedalaman: ${gempa.Kedalaman} km\n`;
        messageToSend += `Magnitudo: ${gempa.Magnitude}\n`;
        messageToSend += `Potensi: ${gempa.Potensi}\n\n`;
      }
  
      await message.reply(messageToSend);
    } catch (error) {
      console.error('Error:', error.message);
      await message.reply('Error fetching earthquake data. Please try again later.');
    }
  }
  

// Rest of the code remains the same...
module.exports = handleGempaTerkiniCommand;
