const db = require('./MysqlModel.js');

module.exports = {
  Query:  () => {
    const sql = `SELECT checks.p_id, staff.name, time, e_day, l_day, subsidy
    from checks, staff
    where checks.p_id = staff.p_id
    ORDER BY checks.p_id`
    return db.query(sql, []);
  },
  Add: (p_id,time,e_day,l_day,subsidy) => {
    const sql = `insert into checks(p_id,time,e_day,l_day,subsidy) values(?,?,?,?,?)`
    return db.query(sql,[p_id,time,e_day,l_day,subsidy]);
  },
  Remove: (p_id,time) => {
    const sql = `DELETE FROM checks WHERE p_id = ? and time = ?`
    return db.query(sql,[p_id,time]);
  },
  Update: (p_id,time,e_day,l_day,subsidy) => {
    const sql = `UPDATE checks SET e_day = ?, l_day = ?, subsidy = ? WHERE p_id = ? and time = ?`
    return db.query(sql,[e_day,l_day,subsidy,p_id,time])
  }
}