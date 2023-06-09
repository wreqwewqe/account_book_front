import { request } from "umi";

//用户登录
 const login=(data)=>{
    console.log("rrr")
     return request('/api/login',{
        method:"post",
        data
      });
}

//当前登录用户信息
const currentInfo=(data)=>{
  return request('/api/users/info',{
     method:"post",
     data
   });
}

//发送短信
const sendMsg=(data)=>{
   return request('/msg',{
      method:"post",
      data:{
         "PhoneNumberSet": [
           "15340546204"
         ],
         "SmsSdkAppId": "1400815009",
         "SignName": "hqcxSite个人网",
         "TemplateId": "1801816",
         "TemplateParamSet": [
           "123456"
         ],
       }
    });
}

export {login,currentInfo,sendMsg} 