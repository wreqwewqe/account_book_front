import React from 'react'
import styles from "./index.less"
import { Avatar } from 'antd'
export default function TopHeader() {
  return (
    <div className={styles.container}>
        <div> 程鹏</div>
        <Avatar className={styles.avatar} src={<img src={IMG} alt="avatar" />} />
      

    </div>
  )
}
