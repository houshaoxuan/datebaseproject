const db = require('./MysqlModel.js');

module.exports = {
  Query:  () => {
    const sql = `SELECT j_id, name, base, level
    from jobtype
    ORDER BY j_id`
    return db.query(sql, []);
  },
  Add: (j_id,name,base,level) => {
    const sql = `insert into jobtype(j_id,name,base,level) values(?,?,?,?)`
    return db.query(sql,[j_id,name,base,level]);
  },
  Remove: (j_id) => {
    const sql = `DELETE FROM jobtype WHERE j_id = ?`
    return db.query(sql,[j_id]);
  },
  Update: (j_id,name,base,level) => {
    const sql = `UPDATE jobtype SET name = ?, base = ?, level = ? where j_id = ?`
    return db.query(sql,[name,base,level,j_id]);
  }
}