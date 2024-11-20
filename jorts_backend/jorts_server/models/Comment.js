const db = require('../db/init')();

function createComment(userId, content, callback) {
  const sql = `INSERT INTO comments (user_id, content) VALUES (?, ?)`;
  db.run(sql, [userId, content], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, userId, content });
  });
}

function getCommentsByUserId(userId, callback) {
  const sql = `SELECT * FROM comments WHERE user_id = ?`;
  db.all(sql, [userId], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

function updateComment(commentId, content, callback) {
  const sql = `UPDATE comments SET content = ? WHERE id = ?`;
  db.run(sql, [content, commentId], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
}

function deleteComment(commentId, callback) {
  const sql = `DELETE FROM comments WHERE id = ?`;
  db.run(sql, [commentId], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
}

module.exports = {
  createComment,
  getCommentsByUserId,
  updateComment,
  deleteComment,
};
