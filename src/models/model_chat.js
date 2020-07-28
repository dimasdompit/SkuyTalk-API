const connection = require("../helpers/mysql");

module.exports = {
  showChatsModel: (sender, receiver) => {
    // const q = `%${keyword}%`;
    // let end = limit * page - limit;
    return new Promise((resolve, reject) => {
      let sql = `SELECT *, (SELECT fullname FROM users WHERE users.id = chat.sender) AS senderName, (SELECT fullname FROM users WHERE users.id = chat.receiver) AS receiverName FROM chat WHERE chat.sender = ? AND chat.receiver = ? OR chat.receiver = ? OR chat.sender = ?`;
      // WHERE senderName LIKE ? OR receiverName LIKE ? OR content LIKE ? ORDER BY ${sort} ${order} LIMIT ? OFFSET ?;
      connection.query(
        sql,
        [sender, receiver, receiver, sender],
        (error, result) => {
          if (error) {
            reject(error);
          }

          resolve(result);
        }
      );
    });
  },

  getChatById: (receiver) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT chat.id, chat.sender, users.name as sender_name, chat.receiver, chat.message, chat.date FROM chat INNER JOIN users ON users.id=chat.sender WHERE chat.id IN (SELECT MAX(id) FROM chat WHERE chat.receiver=? GROUP BY chat.sender) ORDER BY date DESC`;
      connection.query(sql, receiver, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  postChatsModel: (setData) => {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO chat SET ?`;
      connection.query(sql, setData, (error, result) => {
        if (error) {
          reject(error);
        }

        const newData = {
          id: result.insertId,
          ...setData,
        };
        resolve(newData);
      });
    });
  },

  putChatsModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE chat SET ? WHERE id=?`;
      connection.query(sql, [setData, id], (error, result) => {
        if (error) {
          reject(error);
        }

        const newData = {
          id,
          ...setData,
        };
        resolve(newData);
      });
    });
  },

  deleteChatsModel: (id) => {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM chat WHERE id=?`;
      connection.query(sql, id, (error, result) => {
        if (error) {
          reject(error);
        }

        const newData = {
          id,
          ...result,
        };
        resolve(newData);
      });
    });
  },
};
