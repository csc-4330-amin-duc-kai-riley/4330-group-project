const db = require('../db/init')();

function createUpload(userId, imagePath, callback) {
  const sql = `INSERT INTO uploads (user_id, image_path) VALUES (?, ?) ON CONFLICT(user_id, upload_date) DO UPDATE SET image_path = ?`;
  db.run(sql, [userId, imagePath, imagePath], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, userId, imagePath });
  });
}

function getUploadsByUserId(userId, callback) {
  const sql = `SELECT * FROM uploads WHERE user_id = ?`;
  db.all(sql, [userId], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

function deleteUpload(uploadId, callback) {
  const sql = `DELETE FROM uploads WHERE id = ?`;
  db.run(sql, [uploadId], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
}

module.exports = {
  createUpload,
  getUploadsByUserId,
  deleteUpload,
};
