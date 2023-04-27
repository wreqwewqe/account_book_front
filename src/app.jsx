// 运行时配置

import { message, Badge } from 'antd';
import '@/utils/rem.js';



export const request = {
    
    // 统一的请求设定
    timeout: 1000000,
    baseURL:"http://localhost:5001",
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  
   
    // 请求拦截器
    requestInterceptors: [
      (config) => {
      // 拦截请求配置，进行个性化处理。
        
        return { ...config};
      }
    ],
   
    // 响应拦截器
    responseInterceptors: [
      (response) => {
         // 拦截响应数据，进行个性化处理
        //  const { data } = response;
        //  if(!data.success){
        //    message.error('请求失败！');
        //  }
        //  return response;
      }
    ]
  };
