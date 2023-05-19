import React, { useEffect, useState,useRef } from 'react'
import { Avatar, List,Input,Button,Spin } from 'antd';
import {useModel} from "umi"
import styles from "./index.less"
import {chat} from "@/services/ai"
import {
    EnterOutlined
  } from '@ant-design/icons';

export default function Chat() {
    const { initialState, } =useModel('@@initialState');
    const [data,setData]=useState([]);
    const [spinning,setSpinning]=useState(false);
    const [value,setValue]=useState("");
    //每次改变重新去请求
    const [change,setChange]=useState(false);
    console.log("initialState",initialState)
    useEffect(()=>{
        if(data.length>0){
            sendChat()
        }
    },[change])

    const sendChat=async()=>{
        setSpinning(true)
        const res=await chat(data);
        setData([...data,res.choices[0].message])
        setSpinning(false)
        console.log("an",res);
    }
    const onChange=(e)=>{
        console.log("e",e)
        e.stopPropagation();
        setValue(e.target.value)
    }
    const onKeyDown=(e)=>{
        if(e.keyCode===13){
            e.preventDefault();
            setData([...data,{"role":"user","content":value}])
            setChange(!change)
            setValue("")
        }
    }
  return (
    <div className={styles.container}>
        <Spin className={styles.spin} tip="正在加速生成中" size="large" spinning={spinning}>
        </Spin>
        <div className={styles.content}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src={item.role==="user"?initialState.avatar:`https://xsgames.co/randomusers/avatar.php?g=pixel&key=9`}/>}
                    title={<a>{item.role==="user"?initialState.info.username:item.role}</a>}
                    description={item.content}
                    />
                </List.Item>
                )}
            />
           
        </div>
        <div className={styles.sendmsg}>
         <Input.TextArea   allowClear className={styles.in} rows={3} onChange={onChange} onKeyDown={onKeyDown} value={value} ></Input.TextArea>
        </div>
    </div>
  )
}
