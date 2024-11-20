const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Adjust the path to your database file as needed
const DB_PATH = path.resolve(__dirname, '../../sqlite/mydatabase.db');

const connectDb = () => {
  const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('Error connecting to database:', err.message);
    } else {
      console.log('Connected to SQLite database.');
    }
  });

  return db;
};

module.exports = connectDb;
