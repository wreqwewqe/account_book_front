import {request} from "umi"

//更新用户

const updateUser=(data)=>{
    return request('/users/update',{
       method:"post",
       data
     });
  }
 //上传头像
const uploadImg=(data)=>{
    return request('/users/upload',{
       method:"post",
       data
     });
  }

//获取图片
 const getAvatar=(data)=>{
   return request(`/${data}`,{
      method:"get",
      data
    });
 }
 
  
  export {updateUser,uploadImg,getAvatar}