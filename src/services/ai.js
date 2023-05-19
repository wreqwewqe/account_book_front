import { request } from "umi";
//聊天
const chat=(data)=>{
    return request('/v1/chat/completions',{
       method:"post",
       data:{
        "model": "gpt-3.5-turbo",
        "messages":data,
        "temperature": 0.7
       }
     });
  }
  const aigcImg=(data)=>{
    return request('/v1/images/generations',{
       method:"post",
       data:{
        "prompt": data,
        "n":2,
        "size": "512x512"
       }
     });
  }
  export {chat,aigcImg} 