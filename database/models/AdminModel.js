const db = require('./MysqlModel.js');

module.exports = {
  // 连接数据库根据用户名和密码查询管理员是否存在
  Login: async (userName, password) => {
    const sql = 'select * from users where username = ? and password = ?';
    return db.query(sql, [userName, password]);
  }
}