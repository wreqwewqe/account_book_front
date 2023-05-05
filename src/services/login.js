import { request } from "umi";

//用户登录
 const login=(data)=>{
     return request('/login',{
        method:"post",
        data
      });
}

//当前登录用户信息
const currentInfo=(data)=>{
  return request('/users/info',{
     method:"post",
     data
   });
}


export {login,currentInfo} 