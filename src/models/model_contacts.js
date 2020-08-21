const connection = require("../helpers/mysql");

module.exports = {
  getAllContactModel: (userId) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT id , (SELECT fullname FROM users WHERE users.id = contacts.friend_id) AS friendName, (SELECT image FROM users WHERE users.id = contacts.friend_id) AS friendImage, (SELECT id FROM users WHERE users.id = contacts.friend_id) AS idFriend, (SELECT longitude FROM users WHERE users.id = contacts.friend_id) AS longitude, (SELECT latitude FROM users WHERE users.id = contacts.friend_id) AS latitude FROM contacts WHERE contacts.user_id = ? ORDER BY friendName ASC`;
      connection.query(sql, userId, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  },
};
