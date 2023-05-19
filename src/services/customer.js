import { request } from "umi";

//客户列表
 const customerLists=(data)=>{
     return request('/api/customer/list',{
        method:"post",
        data
      });
}
//更新客户
const updateCustomer=(data)=>{
  return request('/api/customer/update',{
     method:"post",
     data
   });
}
//创建客户
const createCustomer=(data)=>{
  return request('/api/customer/create',{
     method:"post",
     data
   });
}

//删除客户
const deleteCustomer=(data)=>{
  return request('/api/customer/delete',{
     method:"post",
     data
   });
}
export {customerLists,updateCustomer,createCustomer,deleteCustomer} 