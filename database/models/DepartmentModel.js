const db = require('./MysqlModel.js');

module.exports = {
  Query:  () => {
    const sql = `SELECT d_id, name, totalsalary, totalperson
    from department
    ORDER BY d_id`
    return db.query(sql, []);
  },
  Add: (d_id,name,totalsalary,totalperson) => {
    const sql = `insert into department(d_id,name,totalsalary,totalperson) values(?,?,?,?)`
    return db.query(sql,[d_id,name,totalsalary,totalperson]);
  },
  Remove: (d_id) => {
    const sql = `DELETE FROM department WHERE d_id = ?`
    return db.query(sql,[d_id]);
  },
  Update: (d_id,name,totalsalary,totalperson) => {
    const sql = `UPDATE department SET name = ?, totalsalary = ?, totalperson = ? WHERE d_id = ?`
    return db.query(sql,[name,totalsalary,totalperson,d_id])
  }
}