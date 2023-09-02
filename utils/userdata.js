const { userdb, msgdb } = require("./database");

async function handleRegistration(message) {
    const number = (await message.getContact()).id.user;
    const server = (await message.getContact()).id.server;
    const name = (await message.getContact()).pushname;
    const devicetype = message.deviceType;
  
    // Check if the user already exists in the database based on their phone number
    const existingUser = await userdb.findOne({ phonenumber: number });
  
    if (!existingUser) {
      // If the user doesn't exist, create a new user entry
      const databaseid = Math.floor(Math.random() * 99999);
      const today = new Date();
      const todayString = today.toDateString();
  
      const newUser = new userdb({
        databaseid,
        phonenumber: number,
        server,
        pushname: name,
        os: devicetype, // Use devicetype as the os
        registeredAt: todayString,
      });
  
      // Save the new user to the database
      await newUser.save();
  
      console.log(`New user registered: ${number}`);
    } else {
      console.log(`User already exists: ${number}`);
    }
  
    // Continue with any additional logic you have for handling the registration
  }

  async function handleMessageRegistration(message) {
    const number = (await message.getContact()).id.user;
    const name = (await message.getContact()).pushname;
    const randomNum = Math.floor(Math.random() * 99999);
    const chat = await message.getChat(); // Get the chat context
    const isgroup = chat.isGroup; // Determine if it's a group chat or not
  
    const { to, body, timestamp } = message;
    const phonenumber = isgroup ? to : number; // Use 'to' for groups, 'number' for individuals
    const groupName = isgroup ? chat.name : null; // Use chat.name for groupName in groups
  
    // Adjust the timestamp for GMT+7 (Indochina Time or ICT) which is 7 hours ahead of GMT
    const timestampOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
    const createdAt = new Date(timestamp * 1000 + timestampOffset).toISOString();
  
    let isMedia = false;
    let mediadata = null;
  
    // Check if the message has media
    if (message.hasMedia) {
      // Download the media
      const media = await message.downloadMedia();
  
      // Convert the media to base64
      mediadata = media.data.toString('base64');
      isMedia = true;
    }
  
    // Create a new message entry
    const newMessage = new msgdb({
      databaseid: randomNum,
      username: name,
      phonenumber,
      isGroup: isgroup,
      groupName,
      message: body,
      isMedia, // Include a flag to indicate if it's media
      mediadata, // Include the base64 media data if it has media
      createdAt,
    });
  
    // Save the new message to the database
    await newMessage.save();
  
    console.log(`New message registered: ${name} - ${phonenumber}`);
  }
  
  
  
  
  
  

module.exports = {
    handleRegistration,
    handleMessageRegistration
}