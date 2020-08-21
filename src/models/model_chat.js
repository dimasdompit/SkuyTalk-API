const connection = require("../helpers/mysql");

module.exports = {
  showChatsModel: (sender, receiver) => {
    // const q = `%${keyword}%`;
    // let end = limit * page - limit;
    return new Promise((resolve, reject) => {
      let sql = `SELECT *, (SELECT fullname FROM users WHERE users.id = chat.sender) AS sender_name, (SELECT image FROM users WHERE users.id = chat.sender) AS sender_image, (SELECT fullname FROM users WHERE users.id = chat.receiver) AS receiver_name FROM chat WHERE chat.sender = ? AND chat.receiver = ? OR chat.receiver = ? AND chat.sender = ?`;
      connection.query(
        sql,
        [sender, receiver, sender, receiver],
        (error, result) => {
          if (error) {
            reject(error);
          }

          resolve(result);
        }
      );
    });
  },

  getChatByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      // let sql = `SELECT chat.id, chat.sender, users.fullname as sender_name, users.image as sender_image, chat.receiver, chat.content, chat.date FROM chat INNER JOIN users ON users.id=chat.sender WHERE chat.id IN (SELECT MAX(id) FROM chat WHERE chat.receiver=? GROUP BY chat.sender) ORDER BY date DESC`;
      let sql = `SELECT m.*, users.fullname, users.image FROM chat m LEFT JOIN chat m1 ON (((m.sender = m1.sender AND m.receiver = m1.receiver) OR (m.sender = m1.receiver AND m.receiver = m1.sender ) ) AND CASE WHEN m.date = m1.date THEN m.id < m1.id ELSE m.date < m1.date END ) INNER JOIN users ON (m.sender = users.id OR m.receiver = users.id) WHERE users.id != ? AND m1.id IS null AND ? IN(m.sender, m.receiver) ORDER BY date DESC`;
      connection.query(sql, [id, id], (error, result) => {
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
