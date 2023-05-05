import { defineConfig } from '@umijs/max';
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  valtio: {},
  hash: true,
  initialState: {},
  request: {},
  layout: {
    // title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      // redirect: '/login',
      component: '@/pages/Login',
      menuRender: false,
      headerRender: false
    },
    {
      path: "/login",
      component: '@/pages/Login',
      menuRender: false,
      headerRender: false
    },
    {
      path:"/customer",
      component:"@/pages/Customer",
      name:"客户管理",
      // headerRender: true
    },
    {
      path:"/order",
      component:"@/pages/Order",
      name:"订单管理"
    },
    {
      path:"/profile",
      component:"@/pages/Profile",
      name:"个人信息"
    }
  ],
  
  npmClient: 'npm',
});

