const db = require('./MysqlModel.js');

module.exports = {
  // 连接数据库根据用户名和密码查询管理员是否存在
  Query:  () => {
    const sql = `SELECT staff.p_id, staff.name, staff.gender, staff.age, staff.level, jobtype.name as jobtype, department.name as department, staff.t_id, staff.d_id
    from staff, jobtype, department
    WHERE staff.t_id = jobtype.j_id AND staff.d_id = department.d_id
    ORDER BY staff.name`
    return db.query(sql, []);
  },
  Add: (name,p_id,gender,age,t_id,d_id,level) => {
    const sql = `insert into staff(name,p_id,gender,age,t_id,d_id,level) values(?,?,?,?,?,?,?)`
    return db.query(sql,[name,p_id,gender,age,t_id,d_id,level]);
  },
  Remove: (p_id) => {
    const sql = `DELETE FROM staff WHERE p_id = ?`
    return db.query(sql,[p_id]);
  },
  Update: (name,p_id,gender,age,t_id,d_id,level) => {
    const sql = `UPDATE staff SET name = ?, gender = ?, age = ?, t_id = ?, d_id =?, level = ? WHERE p_id = ?`
    return db.query(sql,[name,gender,age,t_id,d_id,level,p_id])
  }
}