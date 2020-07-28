const connection = require("../helpers/mysql");

module.exports = {
  getAllContactModel: (userId, friendId) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT *, (SELECT fullname FROM users WHERE users.id = contacts.user_id) AS user_name, (SELECT fullname FROM users WHERE users.id = contacts.friend_id) AS friend_name FROM contacts WHERE contacts.user_id = ? AND contacts.friend_id = ? OR contacts.friend_id = ? OR contacts.user_id = ?`;
      connection.query(
        sql,
        [userId, friendId, friendId, userId],
        (error, result) => {
          if (error) {
            reject(error);
          }

          resolve(result);
        }
      );
    });
  },
};
