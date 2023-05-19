import React, { useEffect, useState,useRef } from 'react'
import { Avatar, List,Input,Button,Spin,Image, message } from 'antd';
import {useModel} from "umi"
import styles from "./index.less"
import {aigcImg} from "@/services/ai"


export default function AIFCImg() {
    const { initialState, } =useModel('@@initialState');
    const [data,setData]=useState([]);
    const [spinning,setSpinning]=useState(false);
    const [value,setValue]=useState("");
    const onChange=(e)=>{
        console.log("e",e)
        e.stopPropagation();
        setValue(e.target.value)
    }
    const onKeyDown=async(e)=>{
        if(e.keyCode===13){
            console.log("ee",e)
            e.preventDefault();
            setData([])
            setValue("")
            setSpinning(true)
            const res=await aigcImg(value);
            if(res.data){
                setData(res.data)
            }else{
                message.error("请求失败，稍后再试")
            }
            setSpinning(false)
            console.log("an",res);
            
        }
    }
  return (
    <div className={styles.container}>
        <Spin className={styles.spin} tip="正在加速生成中" size="large" spinning={spinning}>
        </Spin>
        <div className={styles.content}>
            {
                data&&data.map(item=>{
                    return <Image key={item.url} src={item.url}/>
                })
            }      
        </div>
        <div className={styles.sendmsg}>
         <Input.TextArea placeholder='一句话生成图片'  allowClear className={styles.in} rows={3} onChange={onChange} onKeyDown={onKeyDown} value={value} ></Input.TextArea>
        </div>
    </div>
  )
}
