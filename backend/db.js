const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbFile = process.env.DB_FILE || path.join(__dirname, 'data.sqlite');

const db = new sqlite3.Database(dbFile);

function init() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      date TEXT,
      weight REAL,
      steps INTEGER,
      notes TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
  });
}

module.exports = { db, init };
