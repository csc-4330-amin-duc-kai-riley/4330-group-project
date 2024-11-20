const db = require('../db/init')();

function createUserProfile(userId, bio, socialLinks, callback) {
  const sql = `INSERT INTO user_profiles (user_id, bio, social_links) VALUES (?, ?, ?)`;
  db.run(sql, [userId, bio, socialLinks], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, userId, bio, socialLinks });
  });
}

function getUserProfileByUserId(userId, callback) {
  const sql = `SELECT * FROM user_profiles WHERE user_id = ?`;
  db.get(sql, [userId], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
}

function updateUserProfile(userId, bio, socialLinks, callback) {
  const sql = `UPDATE user_profiles SET bio = ?, social_links = ? WHERE user_id = ?`;
  db.run(sql, [bio, socialLinks, userId], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
}

function deleteUserProfile(userId, callback) {
  const sql = `DELETE FROM user_profiles WHERE user_id = ?`;
  db.run(sql, [userId], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
}

module.exports = {
  createUserProfile,
  getUserProfileByUserId,
  updateUserProfile,
  deleteUserProfile,
};
