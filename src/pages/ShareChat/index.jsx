import { Input } from 'antd';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useModel } from "umi";
import styles from "./index.less";

export default function ShareChat() {
    const { initialState, } =useModel('@@initialState');
    console.log("initialState",initialState);
    const {info}=initialState;
    const [socket,setSocket]=useState("");
    const [msgs,setMsgs]=useState([]);
    const [value,setValue]=useState("");
    // console.log("msgs",msgs);
    useEffect(()=>{
        let socket=new WebSocket("ws://localhost:5001/websocket");
        setSocket(socket);
        socket.addEventListener("message", (event) => { 
          console.log("Message from server ", event.data);
          console.log("useEffect里面的msgs",msgs);
            // setMsgs(prevMsgs => [...prevMsgs, event.data])
          msgs.push(event.data);
            setMsgs([...msgs])
        });
        // Connection opened
        socket.addEventListener("open", (event) => {
          socket.send(info.username);
        });
        return ()=>socket.close();
    },[])

 

    const onChange=(e)=>{
        console.log("e",e)
        e.stopPropagation();
        setValue(e.target.value)
    }
    const onKeyDown=(e)=>{
        console.log("e",e);
        if(e.keyCode===13){
            e.preventDefault();
            socket.send(info.username+":"+e.target.value)
            setValue("")
        }
    }
  return (
    <div className={styles.container}>  
        <div className={styles.content}>
            { 
              msgs.map(item=>(<div key={nanoid()}>{item}</div>))
            }
        </div>
        <div className={styles.sendmsg}>
         <Input.TextArea   allowClear className={styles.in} rows={3} onChange={onChange} onKeyDown={onKeyDown}  value={value}></Input.TextArea>
        </div>
    </div>
  )
}