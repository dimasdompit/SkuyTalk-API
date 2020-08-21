const connection = require("../helpers/mysql");

module.exports = {
  getAllUsersModel: () => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT users.id, users.fullname, users.email, users.image, users.username, users.latitude, users.longitude, users.created_at, users.updated_at FROM users`;
      connection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  getUsersByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT users.id, users.fullname, users.email, users.image, users.username, users.latitude, users.longitude, users.created_at FROM users WHERE users.id=?`;
      connection.query(sql, id, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  postUsersModel: (setData) => {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO users SET ?`;
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

  putUsersModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE users SET ? WHERE users.id=?`;
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

  deleteUsersModel: (id) => {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM users WHERE id=?`;
      connection.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
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
