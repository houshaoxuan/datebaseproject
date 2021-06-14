var mysql = require('mysql');
const { dbConfig } = require('../config/mysql_config.js');
var pool = mysql.createPool(dbConfig);

var db = {};

db.query = function (sql, params) {

  return new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {

      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, params, function (error, results, fields) {
        console.log(results);
        // 释放连接
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        results = JSON.parse(JSON.stringify(results))
        resolve(results);
      });

    });
  });
}
// 导出对象
module.exports = db;
