const db = require('./MysqlModel.js');

module.exports = {
  Query:  () => {
    const sql = `SELECT salary.p_id, salary.time, salary.base, salary.extra, salary.willpay, salary.paid
    from salary, staff
    ORDER BY salary.p_id`
    return db.query(sql, []);
  },
  Add: (p_id,time,base,extra,willpay,paid) => {
    const sql = `insert into salary(p_id,time,base,extra,paid,willpay) values(?,?,?,?,?,?)`
    return db.query(sql,[p_id,time,base,extra,willpay,paid]);
  },
  Remove: (p_id,time) => {
    const sql = `DELETE FROM salary WHERE p_id = ? and time = ?`
    return db.query(sql,[p_id,time]);
  },
  Update: (p_id,time,base,extra,willpay,paid) => {
    const sql = `UPDATE salary SET base = ?, extra = ?, willpay = ?, paid = ? WHERE p_id = ? and time = ?`
    return db.query(sql,[base,extra,willpay,paid,p_id,time])
  }
}