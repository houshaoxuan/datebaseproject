// import json from jsonp
import { message } from "antd";
import ajax from "./ajax.jsx";
import jsonp from "jsonp";
// 包含应用中所有接口请求函数的模块
// 要求:能根据接口文档定义接口请求
// 每个函数的返回值都是promise

//登陆
// const defaultUrl = "https//127.0.0.1";
//查询API
//staff
export const staffQuery = () => {
  return ajax('/staff/query')
}
export const staffAdd = (name,p_id,gender,age,t_id,d_id,level) => {
  return ajax('/staff/add',{name,p_id,gender,age,t_id,d_id,level},"POST")
}
export const staffUpdate = (name,p_id,gender,age,t_id,d_id,level) => {
  return ajax('/staff/update',{name,p_id,gender,age,t_id,d_id,level},"POST")
}
export const staffDelete = (p_id) => {
  return ajax('/staff/delete',{p_id},"POST")
}

//salary
export const salaryQuery = () => {
  return ajax('/salary/query')
}
export const salaryAdd = (p_id,time,base,extra,willpay,paid) => {
  return ajax('/salary/add',{p_id,time,base,extra,willpay,paid},"POST")
}
export const salaryUpdate = (p_id,time,base,extra,willpay,paid) => {
  return ajax('/salary/update',{p_id,time,base,extra,willpay,paid},"POST")
}
export const salaryDelete = (p_id,time) => {
  return ajax('/salary/delete',{p_id,time},"POST")
}

//jobtype
export const jobtypeQuery = () => {
  return ajax('/jobtype/query')
}
export const jobtypeAdd = (j_id,name,base,level) => {
  return ajax('/jobtype/add',{j_id,name,base,level},"POST")
}
export const jobtypeUpdate = (j_id,name,base,level) => {
  return ajax('/jobtype/update',{j_id,name,base,level},"POST")
}
export const jobtypeDelete = (j_id) => {
  return ajax('/jobtype/delete',{j_id},"POST")
}

//department
export const departmentQuery = () => {
  return ajax('/department/query')
}
export const departmentAdd = (d_id,name,totalsalary,totalperson) => {
  return ajax('/department/add',{d_id,name,totalsalary,totalperson},"POST")
}
export const departmentUpdate = (d_id,name,totalsalary,totalperson) => {
  return ajax('/department/update',{d_id,name,totalsalary,totalperson},"POST")
}
export const departmentDelete = (d_id) => {
  return ajax('/department/delete',{d_id},"POST")
}

//checks
export const checksQuery = () => {
  return ajax('/check/query')
}
export const checksAdd = (p_id,time,e_day,l_day,subsidy) => {
  return ajax('/check/add',{p_id,time,e_day,l_day,subsidy},"POST")
}
export const checksUpdate = (p_id,time,e_day,l_day,subsidy) => {
  return ajax('/check/update',{p_id,time,e_day,l_day,subsidy},"POST")
}
export const checksDelete = (p_id,time) => {
  return ajax('/check/delete',{p_id,time},"POST")
}
















//
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");
//添加或更新用户
export const reqAddOrUpdateUser = (user) =>
  ajax("/manage/user/" + (user._id ? "update" : "add"), user, "POST");

/* jsonp请求的接口请求函数 */
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://restapi.amap.com/v3/weather/weatherInfo?key=98c97d10c1fda37bdc5402d15c1cdd71&city=${city}`;
    jsonp(url, {}, (err, data) => {
      //   console.log(err, data);
      if (!err && data.status === "1") {
        const { weather } = data.lives[0];
        resolve({ weather });
      } else {
        message.error("天气获取失败");
      }
    });
  });
};
// 获取一级二级分类列表
export const reqCategorys = (parentId) =>
  ajax("/manage/category/list", { parentId });
// reqWeather("北京");
export const reqAddCategory = (categoryName, parentId) =>
  ajax("/manage/category/add", { categoryName, parentId }, "post");

export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax("/manage/category/update", { categoryId, categoryName }, "post");

export const reqProducts = (pageNum, pageSize) =>
  ajax(
    `/manage/product/list?pageNum=${pageNum}&pageSize=${pageSize}`
  );
/* 搜索商品分页列表,或者根据商品描述，或者商品名称 */
export const reqProductsSearch = (pageNum, pageSize, searchName, searchType) =>
  ajax("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });

/* 获取一个分类 */
export const reqCategory = (categoryId) =>
  ajax("/manage/category/info", { categoryId });
/* 更新商品的状态(上/下) */
export const reqUpdateStatus = (productId, status) =>
  ajax(
    "/manage/product/updateStatus",
    { productId, status },
    "post"
  );

//添加/修改商品  //多加一个/
export const reqAddProduct = (product) =>
  ajax(
    "/manage/product/" +
      (product._id ? "update" : "add"),
    product,
    "post"
  ); //这个本身是对象，所以不用加{}

//删除指定名称的图片
export const reqDelImg = (name) =>
  ajax("/manage/img/delete", { name }, "post");
//获取所有角色列表
export const reqRoleList = () =>
  ajax("/manage/role/list");
//添加角色   //参数加{}要求名字对应 不加要求顺序对应
export const reqAddRole = (roleName) =>
  ajax("/manage/role/add", { roleName }, "post");
//更新权限
export const reqUpdateRole = (role) =>
  ajax("/manage/role/update", role, "post");
//获取用户列表所有
export const reqUsers = () =>
  ajax("/manage/user/list");
//删除指定用户
export const reqDelUser = (userId) =>
  ajax("/manage/user/delete", { userId }, "post");
//添加用户
// export const reqAddUser = (user) => ajax('http://120.55.193.14:5000/manage/user/add',{user},'post')
