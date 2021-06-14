/*
用来定义路由的路由器模块
 */
const express = require('express')
const md5 = require('blueimp-md5')
const moment = require('../tools/rendertime')
const rendertime = require('../tools/rendertime')

const AdminModel = require('../models/AdminModel')
const StaffModel = require('../models/StaffModel')
const SalaryModel = require('../models/SalaryModel')
const JobtypeModel = require('../models/JobtypeModel')
const DepartmentModel = require('../models/DepartmentModel')
const CheckModel = require('../models/CheckModel')


// 得到路由器对象
const router = express.Router()
// console.log('router', router)

// 指定需要过滤的属性
const filter = {password: 0, __v: 0}


// 登陆
router.post('/login', (req, res) => {
  const {username, password} = req.body
  // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
  AdminModel.Login(username, password)
    .then(user => {
      if (user.length) { // 登陆成功
        // 生成一个cookie(userid: user._id), 并交给浏览器保存
        console.log('sign in success');
        user = user[0];
        res.cookie('userid', user.username, {maxAge: 1000 * 60 * 60 * 24})
        res.send({status: 0, data: user})
      } else {// 登陆失败
        res.send({status: 1, msg: '用户名或密码不正确!'})
      }
    })
    .catch(error => {
      console.error('登陆异常', error)
      res.send({status: 1, msg: '登陆异常, 请重新尝试'})
    })
})
//staff_query
router.get('/staff/query',(req,res) => {
  StaffModel.Query()
  .then(result => {
    if(result) {
      res.send({status: 0, data: result})
    }
  })
  .catch(error => {
    console.log(error);
    res.send({status: 1, msg: '用户基本信息查询异常'})
  })
})
//staff_add
router.post('/staff/add',(req,res) => {
  console.log(req.body);
  console.log(req.body.name);
  StaffModel.Add(req.body.name,req.body.p_id,req.body.gender,req.body.age,req.body.t_id,req.body.d_id,req.body.level)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '添加员工异常'})
    })
})
//staff_delete
router.post('/staff/delete',(req,res) => {
  StaffModel.Remove(req.body.p_id)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '删除员工异常'})
    })
})
//staff_update
router.post('/staff/update',(req,res) => {
  StaffModel.Update(req.body.name,req.body.p_id,req.body.gender,req.body.age,req.body.t_id,req.body.d_id,req.body.level)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '更新员工异常'})
    })
})





//salary_query
router.get('/salary/query',(req,res) => {
  SalaryModel.Query()
  .then(result => {
    if(result) {
      for(let i = 0; i < result.length; i++){
        result[i].time = rendertime(result[i].time).split(' ')[0]
      }
      res.send({status: 0, data: result})
    }
  })
  .catch(error => {
    console.log(error);
    res.send({status: 1, msg: '工资信息查询异常'})
  })
})
//salary_add
router.post('/salary/add',(req,res) => {
  SalaryModel.Add(req.body.p_id,req.body.time,req.body.base,req.body.extra,req.body.willpay,req.body.paid)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '添加工资信息异常'})
    })
})
//salary_delete
router.post('/salary/delete',(req,res) => {
  SalaryModel.Remove(req.body.p_id,req.body.time)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '删除员工异常'})
    })
})
//salary_update
router.post('/salary/update',(req,res) => {
  SalaryModel.Update(req.body.p_id,req.body.time,req.body.base,req.body.extra,req.body.willpay,req.body.paid)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '修改工资信息异常'})
    })
})


//jobtype_query
router.get('/jobtype/query',(req,res) => {
  JobtypeModel.Query()
  .then(result => {
    if(result) {
      res.send({status: 0, data: result})
    }
  })
  .catch(error => {
    console.log(error);
    res.send({status: 1, msg: '工种信息查询异常'})
  })
})
//jobtype_add
router.post('/jobtype/add',(req,res) => {
  JobtypeModel.Add(req.body.j_id,req.body.name,req.body.base,req.body.level)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '添加工种信息异常'})
    })
})
//jobtype_delete
router.post('/jobtype/delete',(req,res) => {
  JobtypeModel.Remove(req.body.j_id)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '删除工种信息异常'})
    })
})
//jobtype_update
router.post('/jobtype/update',(req,res) => {
  JobtypeModel.Update(req.body.j_id,req.body.name,req.body.base,req.body.level)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '修改工种信息异常'})
    })
})


//department_query
router.get('/department/query',(req,res) => {
  DepartmentModel.Query()
  .then(result => {
    if(result) {
      res.send({status: 0, data: result})
    }
  })
  .catch(error => {
    console.log(error);
    res.send({status: 1, msg: '部门信息查询异常'})
  })
})
//department_add
router.post('/department/add',(req,res) => {
  DepartmentModel.Add(req.body.d_id,req.body.name,req.body.totalsalary,req.body.totalperson)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '添加部门信息异常'})
    })
})
//department_delete
router.post('/department/delete',(req,res) => {
  DepartmentModel.Remove(req.body.d_id)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '删除部门信息异常'})
    })
})
//department_update
router.post('/department/update',(req,res) => {
  DepartmentModel.Update(req.body.d_id,req.body.name,req.body.totalsalary,req.body.totalperson)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '修改部门信息异常'})
    })
})


//check_query
router.get('/check/query',(req,res) => {
  CheckModel.Query()
  .then(result => {
    if(result) {
      for(let i = 0; i < result.length; i++){
        result[i].time = rendertime(result[i].time).split(' ')[0]
      }
      res.send({status: 0, data: result})
    }
  })
  .catch(error => {
    console.log(error);
    res.send({status: 1, msg: '考勤信息查询异常'})
  })
})
//department_add
router.post('/check/add',(req,res) => {
  CheckModel.Add(req.body.p_id,req.body.time,req.body.e_day,req.body.l_day,req.body.subsidy)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '添加考勤信息异常'})
    })
})
//department_delete
router.post('/check/delete',(req,res) => {
  CheckModel.Remove(req.body.p_id,req.body.time)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '删除考勤信息异常'})
    })
})
//department_update
router.post('/check/update',(req,res) => {
  CheckModel.Update(req.body.p_id,req.body.time,req.body.e_day,req.body.l_day,req.body.subsidy)
    .then(result => {
      if(result) {
        res.send({status: 0})
      }
    })
    .catch(error => {
      console.log(error)
      res.send({status: 1, msg: '修改考勤信息异常'})
    })
})
















require('./file-upload')(router)

module.exports = router