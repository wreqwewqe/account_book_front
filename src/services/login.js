import { request } from "umi";

//用户登录
 const login=(data)=>{
     return request('/login',{
        method:"post",
        data
      });
}


export {login} 