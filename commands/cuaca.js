const axios = require('axios');
const { parseStringPromise } = require('xml2js');
async function getWeatherForecast(province, city) {
    try {
      const response = await axios.get(`http://localhost:2112/weather/${province}/${city}`);
      const data = response.data;
  
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      throw error;
    }
  }

  
  
//   async function handleCuacaCommand(message) {
//     const args = message.body.split(' ');
//     const province = args[1];
//     const city = args[2];
//     try {
//       const weatherForecast = await getWeatherForecast(province, city);
//       console.log(weatherForecast.success);
  
//       if (weatherForecast.success && weatherForecast.data && weatherForecast.data.params) {
//         const hourlyWeather = weatherForecast.data.params.find((param) => param.id === 't');
//         const humidity = weatherForecast.data.params.find((param) => param.id === 'hu');
//         const weather = weatherForecast.data.params.find((param) => param.id === 'weather');
        
//         let messageToSend = `Current weather in ${city} (${province}):\n\n`;
  
//         if (hourlyWeather && hourlyWeather.times && hourlyWeather.times.length > 0) {
//           const currentWeather = hourlyWeather.times[0];
//           messageToSend += `Temperature: ${currentWeather.celcius}\n`;
//         }
  
//         if (humidity && humidity.times && humidity.times.length > 0) {
//           const currentHumidity = humidity.times[0];
//           messageToSend += `Humidity: ${currentHumidity.value}\n`;
//         }
  
//         if (weather && weather.times && weather.times.length > 0) {
//           const currentWeatherStatus = weather.times[0];
//           messageToSend += `Weather: ${currentWeatherStatus.name}\n`;
//         }
  
//         await message.reply(messageToSend);
//       } else {
//         await message.reply(`City '${city}' not found in the weather forecast data.`);
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       await message.reply('Error fetching weather data. Please try again later.');
//     }
//   }
  
async function handleCuacaCommand(message) {
    const args = message.body.split(' ');
    const province = args[1];
    const city = args[2];

    if(args.length < 3) return await message.reply(`Please use !weather <province> eg (dki-jakarta) <city> eg (Jakarta-Timur) or (Kepulauan-Seribu)`)
    try {
      const weatherForecast = await getWeatherForecast(province, city);
  
      if (weatherForecast.success && weatherForecast.data && weatherForecast.data.params) {
        const dailyMaxTemperature = weatherForecast.data.params.find((param) => param.id === 'tmax');
        const dailyMaxHumidity = weatherForecast.data.params.find((param) => param.id === 'humax');
        const hourlyWeather = weatherForecast.data.params.find((param) => param.id === 't');
        const humidity = weatherForecast.data.params.find((param) => param.id === 'hu');
        const weather = weatherForecast.data.params.find((param) => param.id === 'weather');
        const dailyWeather = weatherForecast.data.params.find((param) => param.id === 'weather');
        
        let messageToSend1 = `Current weather in ${city} (${province}):\n\n`;
  
        if (hourlyWeather && hourlyWeather.times && hourlyWeather.times.length > 0) {
          const currentWeather = hourlyWeather.times[0];
          messageToSend1 += `Temperature: ${currentWeather.celcius}\n`;
        }
  
        if (humidity && humidity.times && humidity.times.length > 0) {
          const currentHumidity = humidity.times[0];
          messageToSend1 += `Humidity: ${currentHumidity.value}\n`;
        }
  
        if (weather && weather.times && weather.times.length > 0) {
          const currentWeatherStatus = weather.times[0];
          messageToSend1 += `Weather: ${currentWeatherStatus.name}\n\n`;
        }
  
        let messageToSend = `Tomorrow forecast for ${city} (${province}):\n\n`;
  
        if (dailyMaxTemperature && dailyMaxTemperature.times && dailyMaxTemperature.times.length >= 2) {
          const nextDayTemperature = dailyMaxTemperature.times[1];
          messageToSend += `Date: ${nextDayTemperature.datetime}\n`;
          messageToSend += `Max Temperature for tomorrow: ${nextDayTemperature.celcius}\n`;
        }
  
        if (dailyMaxHumidity && dailyMaxHumidity.times && dailyMaxHumidity.times.length >= 2) {
          const nextDayHumidity = dailyMaxHumidity.times[1];
          messageToSend += `Max Humidity for tomorrow: ${nextDayHumidity.value}\n`;
        }

        if (dailyWeather && dailyWeather.times && dailyWeather.times.length >= 2) {
            const nextDayWeatherStatus = dailyWeather.times[1];
            messageToSend += `Weather for tomorrow: ${nextDayWeatherStatus.name}\n`;
          }
        
  
        await message.reply(messageToSend1 + messageToSend);
      } else {
        await message.reply(`City '${city}' not found in the weather forecast data.`);
      }
    } catch (error) {
      console.error('Error:', error.message);
      await message.reply('Error fetching weather data. Please try again later.');
    }
  }

  

module.exports = handleCuacaCommand;


