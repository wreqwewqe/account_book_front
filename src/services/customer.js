import { request } from "umi";

//客户列表
 const customerLists=(data)=>{
     return request('/customer/list',{
        method:"post",
        data
      });
}
//更新客户
const updateCustomer=(data)=>{
  return request('/customer/update',{
     method:"post",
     data
   });
}
//创建客户
const createCustomer=(data)=>{
  return request('/customer/create',{
     method:"post",
     data
   });
}
export {customerLists,updateCustomer,createCustomer} 