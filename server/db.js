const sqlite3 = require('sqlite3').verbose();
const { devNull } = require('os');
const path = require('path');
const dbPath = path.join(__dirname, '../data/database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});


db.serialize(() => {
    // Create templates table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        html TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating templates table:', err.message);
        } else {
            console.log('Templates table is ready.');
        }
    });

    // Create routes table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS routes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT UNIQUE,
        template_id INTEGER,
        FOREIGN KEY (template_id) REFERENCES templates(id)
    )`, (err) => {
        if (err) {
            console.error('Error creating routes table:', err.message);
        } else {
            console.log('Routes table is ready.');
        }
    });
});


module.exports = db;
