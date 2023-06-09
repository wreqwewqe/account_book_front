import {request} from "umi"

//更新用户

const updateUser=(data)=>{
    return request('/api/users/update',{
       method:"post",
       data
     });
  }
 //上传头像
const uploadImg=(data)=>{
    return request('/api/users/upload',{
       method:"post",
       data
     });
  }

//获取图片
 const getAvatar=(data)=>{
   return request(`/api/${data}`,{
      method:"get",
      data
    });
 }
 
 
  
  export {updateUser,uploadImg,getAvatar}