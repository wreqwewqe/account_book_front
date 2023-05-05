// 运行时配置

import { message, Badge } from 'antd';
import '@/utils/rem.js';
import { currentInfo } from '@/services/login';
import {getAvatar} from '@/services/users'
import RightRender from '@/components/RightRender';
export async function getInitialState() {
  const res=await currentInfo({"parent_uuid":localStorage.getItem("parent_uuid")})
  const r=await getAvatar(localStorage.getItem("parent_uuid"));
  console.log("avatar",r.data.avatar)

  // 将 Vec<u8> 转换为 Blob 对象
  const blob = new Blob([new Uint8Array(r.data.avatar)], { type: 'image/jpeg' });
  // 创建一个指向 Blob 对象的 URL
  const url = URL.createObjectURL(blob);
  console.log("url",url);
  console.log("ccccccccc",res)
  if(res.code===200){
    return {
      info:res.data.info,
      avatar:url
    };
  }else{
    return {}
  }
 
}
export const layout = ({ initialState, setInitialState }) => {

  return {
    // logo: <img  src={} />,
    menu: {
      locale: false,
    },
    layout: 'mix',
    contentStyle: { padding: 10 },
    title: <div onClick={(e)=>{e.stopPropagation()}}>记账本综合管理系统</div>,
    rightRender:(initialState)=><RightRender initialState={initialState}/>,
    logout: () => {
      // deleteCookie('token');
      // window.location.href = `${NAVICATE_URL}/`;
    },
  };
};

export const request = {
    
    // 统一的请求设定
    timeout: 1000000,
    baseURL:BASE_URL,
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
