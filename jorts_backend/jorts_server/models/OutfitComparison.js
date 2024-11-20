const db = require('../db/init')();

function addOutfitComparison(userId, outfitName, callback) {
  const sql = `INSERT INTO outfit_comparisons (user_id, outfit_name) VALUES (?, ?)`;
  db.run(sql, [userId, outfitName], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, userId, outfitName });
  });
}

function getOutfitComparisonsByUserId(userId, callback) {
  const sql = `SELECT * FROM outfit_comparisons WHERE user_id = ?`;
  db.all(sql, [userId], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

function deleteOutfitComparison(id, callback) {
  const sql = `DELETE FROM outfit_comparisons WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
}

module.exports = {
  addOutfitComparison,
  getOutfitComparisonsByUserId,
  deleteOutfitComparison,
};
