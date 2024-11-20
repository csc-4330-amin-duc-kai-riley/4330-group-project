const db = require('../db/init')();

function createUser(username, password, callback) {
  const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.run(sql, [username, password], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, username });
  });
}

function getUserById(userId, callback) {
  const sql = `SELECT * FROM users WHERE id = ?`;
  db.get(sql, [userId], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
}

function updateUser(userId, updates, callback) {
  const { username, password } = updates;
  const sql = `UPDATE users SET username = COALESCE(?, username), password = COALESCE(?, password) WHERE id = ?`;
  db.run(sql, [username, password, userId], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
}

function deleteUser(userId, callback) {
  const sql = `DELETE FROM users WHERE id = ?`;
  db.run(sql, [userId], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
