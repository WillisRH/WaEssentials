// const mysql = require('mysql');

// function createChatHistoryTable(connection) {
//   // Create the "chathistory" table if it doesn't exist
//   const createChatHistoryTableQuery = `
//     CREATE TABLE IF NOT EXISTS chathistory (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       cname VARCHAR(255),
//       pushname VARCHAR(255),
//       phonenumber VARCHAR(255),
//       messagebody TEXT,
//       fromme BOOLEAN
//     )
//   `;

//   connection.query(createChatHistoryTableQuery, (err) => {
//     if (err) {
//       console.error('Error creating chathistory table:', err);
//     } else {
//       console.log('chathistory table created (if it didn\'t exist)');
//     }

//     // Close the database connection after table creation
//     connection.end();
//   });
// }

// function connectToDatabase() {
//   // Create a connection to the MySQL database
//   const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "",
//     database: "waessentials",
//     charset: "utf8mb4",
// });

//   // Connect to the database
//   connection.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return;
//     }
//     console.log('Connected to the database');

//     // Call the function to create the table
//     createChatHistoryTable(connection);
//   });
// }

// module.exports = { connectToDatabase };
