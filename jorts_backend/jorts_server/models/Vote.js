const db = require('../db/init')();

function createVote(userId, pageId, callback) {
  const sql = `INSERT INTO votes (user_id, page_id) VALUES (?, ?) ON CONFLICT(user_id, page_id) DO NOTHING`;
  db.run(sql, [userId, pageId], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, userId, pageId });
  });
}

function getVotesByUserId(userId, callback) {
  const sql = `SELECT * FROM votes WHERE user_id = ?`;
  db.all(sql, [userId], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

function deleteVote(userId, pageId, callback) {
  const sql = `DELETE FROM votes WHERE user_id = ? AND page_id = ?`;
  db.run(sql, [userId, pageId], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
}

module.exports = {
  createVote,
  getVotesByUserId,
  deleteVote,
};
