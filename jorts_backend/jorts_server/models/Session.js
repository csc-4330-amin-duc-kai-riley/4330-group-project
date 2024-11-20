const db = require('../db/init')();

function createSession(userId, token, expiresAt, callback) {
  const sql = `INSERT INTO sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)`;
  db.run(sql, [userId, token, expiresAt], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, userId, token });
  });
}

function getSessionByToken(token, callback) {
  const sql = `SELECT * FROM sessions WHERE session_token = ?`;
  db.get(sql, [token], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
}

function deleteSession(token, callback) {
  const sql = `DELETE FROM sessions WHERE session_token = ?`;
  db.run(sql, [token], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
}

module.exports = {
  createSession,
  getSessionByToken,
  deleteSession,
};
