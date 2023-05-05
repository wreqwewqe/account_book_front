import React from 'react'
import {Avatar,Popover, message} from "antd"
import {useNavigate,useModel } from "umi"
import styles from './index.less'
export default function RightRender({initialState}) {
  // const { initialState, loading, error, refresh, setInitialState } =useModel('@@initialState');
  let navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem("token")
    navigate("/login")
    message.success("退出成功")
  }
  console.log("x",initialState)
  const content = (
    <div className={styles.content}>
      <div onClick={()=>{navigate("/profile")}}>个人中心</div>
      <hr />
      <div onClick={logout}>退出登录</div>
    </div>
  );
  return (
    <div>
      <span className={styles.username}>{initialState.info.username}</span>
      <Popover className={styles.avatar} content={content}>
        <Avatar  src={initialState.avatar}>
        </Avatar>
      </Popover>
    </div>
  )
}
