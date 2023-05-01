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
        if(localStorage.getItem("token")){
          config.headers["Authorization"]="Bearer "+localStorage.getItem("token")
        }

        return { ...config};
      }
    ],
   
    // 响应拦截器
    responseInterceptors: [
      (response) => {
         // 拦截响应数据，进行个性化处理
    
        //  console.log("data",data);
        // console.log("response",response)
        //  if(response.code!=500&&response.data.code!==200){
        //   console.log("失败")
        //    message.error('请求失败！');
        //  }else{
        //   console.log("成功")
          
        //  }
         return response;
      }

    ]
  };
