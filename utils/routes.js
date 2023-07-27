const fs = require("fs")
const path = require("path")
const mysql = require('mysql');

function renderHomePage(req, res, status) {
  res.render('index', { status });
  return status;
}

function renderErrorPage(req, res, status) {
  console.error(err);

  // Render the error page using error.ejs
  res.status(500).render('error.ejs');
}
  
function handleStatusForm(req, res, status) {
    const { body } = req;
  
    // Check if the status is valid
    if (body.status === 'online' || body.status === 'busy' || body.status === 'school' || body.status === 'vanish') {
      status = body.status;
    }
  
    res.redirect('/');
    return status;
}

async function saveChatData(message) {
  try {
    // Access the contact's push name, phone number, and message body
    const contact = await message.getContact();
    const chat = await message.getChat();
    const groupName = chat.name;
    const pushName = contact.pushname;
    const phoneNumber = message._data.author;
    const messageBody = message.body;
    const fromme = message._data.id.fromMe;

    // Create a connection to the MySQL database
    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "waessentials",
      charset: "utf8mb4",
  });

    // Connect to the database
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        return;
      }
      console.log('Connected to the database');

      // Insert the chat data into the "chathistory" table
      const insertChatDataQuery = `
        INSERT INTO chathistory (cname, pushname, phonenumber, messagebody, fromme)
        VALUES (?, ?, ?, ?, ?)
      `;

      connection.query(insertChatDataQuery, [groupName, pushName, phoneNumber, messageBody, fromme], (err) => {
        if (err) {
          console.error('Error inserting chat data into chathistory table:', err);
        } else {
          console.log('Chat data saved to chathistory table');
        }

        // Close the database connection
        connection.end();
      });
    });
  } catch (error) {
    console.error('Error saving chat data:', error);
    // Handle the error appropriately
  }
}


async function renderChatlistPage(req, res) {
  try {
    // Create a connection to the MySQL database
    const connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'waessentials',
      charset: 'utf8mb4',
    });

    // Connect to the database
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        return;
      }
      console.log('Connected to the database');

      // Query the chat data from the "chathistory" table
      const fetchChatDataQuery = `
        SELECT cname, pushname, phonenumber, messagebody
        FROM chathistory
      `;

      connection.query(fetchChatDataQuery, (err, results) => {
        if (err) {
          console.error('Error fetching chat data from chathistory table:', err);
        } else {
          // Render the chatlist page and pass the chat entries to the template
          res.render('chat', { chatEntries: results });
        }

        // Close the database connection
        connection.end();
      });
    });
  } catch (error) {
    console.error('Error rendering chatlist page:', error);
    // Handle the error appropriately
  }
}
  
  
  module.exports = {
    renderHomePage,
    handleStatusForm,
    renderChatlistPage,
    saveChatData,
    renderErrorPage
  };
  