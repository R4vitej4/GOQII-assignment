const mysql = require('mysql');
require('dotenv').config(); // Load environment variables

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port:process.env.port
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
    return;
  }
  console.log('Connected to the database as id:', connection.threadId);
});

module.exports=connection;

