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
      avatar:url,
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
    // baseURL:BASE_URL,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  
   
    // 请求拦截器
    requestInterceptors: [
      (config) => {
        console.log("config",config)
        console.log("坏了")
        console.log("666",config.url)
        console.log("777",typeof config.url)
  
        if(config.url.startsWith("/v1")){
          console.log("我是ai")
          config.headers["Authorization"]="Bearer "+"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"
                                                    //  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
          // config.url="https://129.226.200.159"+config.url;
          console.log("改成过后的config.url",config.url);
          return { ...config};
        }
      // 拦截请求配置，进行个性化处理。
        if(localStorage.getItem("token")){
          console.log("我是登录")
          config.headers["Authorization"]="Bearer "+localStorage.getItem("token")
        }
        console.log("我是nima")
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
