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



export default () => {
  const [loginType, setLoginType] = useState('phone');
  // const { initialState, setInitialState } = useModel('@@initialState');

  return (
    <div
      style={{ height: '100vh', backgroundColor: 'white', paddingTop: '25vh' }}
    >
      <LoginForm
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        onFinish={async (v) => {
          console.log("V",v)
          const res=await login(v);
        
          console.log("res",res)
        }}
        title="记账本"
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey)}
        >
          <Tabs.TabPane key={'phone'} tab={'账号密码登录'} />
        </Tabs>
        <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名: admin or user'}
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
              placeholder={'密码: ant.design'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
      </LoginForm>
    </div>
  );
};
