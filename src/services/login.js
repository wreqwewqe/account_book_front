import { request } from "umi";

//用户登录
 const login=(data)=>{
    console.log("wwwwww1")
    console.log("data",data);
     return request('/login',{
        method:"post",
        data
      });
}

const login1=(data)=>{
  return request('/api/index.php',{
    method:"get",
    data
  });
}

export {login,login1} 