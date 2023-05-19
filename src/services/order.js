import { request } from "umi";

//订单列表
 const orderLists=(data)=>{
     return request('/api/orders/list',{
        method:"post",
        data
      });
}

//订单列表
const updateOrder=(data)=>{
  return request('/api/orders/update',{
     method:"post",
     data
   });
}

//创建订单
const CreateOrder=(data)=>{
  return request('/api/orders/create',{
     method:"post",
     data
   });
}

//删除订单
const deleteOrder=(data)=>{
  return request('/api/orders/delete',{
     method:"post",
     data
   });
}


export {orderLists,updateOrder,CreateOrder,deleteOrder}