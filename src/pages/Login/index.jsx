import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Space, Tabs } from 'antd';
import { useModel, useNavigate, request } from 'umi';
import { useState } from 'react';
import { login } from '@/services/login.js';
import { sendMsg } from '@/services/login';



export default () => {
  const [loginType, setLoginType] = useState('phone');
  // const { initialState, setInitialState } = useModel('@@initialState');
  let navigate=useNavigate();
  return (
    <div
      style={{ height: '100vh', backgroundColor: 'white', paddingTop: '25vh' }}
    >
      <LoginForm
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        onFinish={async (v) => {
          console.log("V",v)
          console.log("loginType",loginType);
          if(loginType==='account'){
            const res=await login(v);
            console.log("res",res);
            if(res.code===200){
              console.log("我我我我")
              localStorage.setItem("token",res.token)
              console.log("reeee",res);
              localStorage.setItem("parent_uuid",res.uuid)
              window.location.href="/customer"
              message.success("登录成功")
            }
          }else{
            // const res=sendMsg
          }
          
        }}
        title="记账本"
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey)}
        >
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {loginType === 'account' &&(
           <>
           <ProFormText
             name="username"
             fieldProps={{
               size: 'large',
               prefix: <UserOutlined className={'prefixIcon'} />,
             }}
             placeholder={'用户名'}
             rules={[
               {
                 required: true,
                 message: '请输入用户名!',
               },
             ]}
           />
           <ProFormText.Password
             name="password"
             fieldProps={{
               size: 'large',
               prefix: <LockOutlined className={'prefixIcon'} />,
             }}
             placeholder={'密码'}
             rules={[
               {
                 required: true,
                 message: '请输入密码！',
               },
             ]}
           />
         </>
        )}
        {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async () => {
                  // message.success('获取验证码成功！验证码为：1234');
                  await
                  console.log("code",mobile.value)
                }}
              />
            </>
          )}
      </LoginForm>
    </div>
  );
};
