import { customerLists, deleteCustomer } from "@/services/customer";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from "umi";
import MyModal from "./MyModal";
import styles from './index.less';
export default function Customer() {
    const { initialState,refresh } =useModel('@@initialState');
    
    console.log("initialState",initialState)
    const [data,setData]=useState({});
    const [customerInfo,setCustomerInfo]=useState({});
    const [open,setOpen]=useState(false);
    const [form] = Form.useForm();
    const [queryForm]=Form.useForm();
    const [current,setCurent]=useState(1);
    const [params,setParams]=useState({
        pagenum:1,
        pagesize:6
    });
    useEffect(()=>{
        getList()
    },[params])
    const getList=async()=>{
        const res=await customerLists(params);
       if(res.code===200){
            console.log("rrrrrrrr")
            setData(res.data)
       }    
    }
    const editCustomer=(record)=>{
        console.log("recor",record);
        setOpen(true);
        setCustomerInfo({...record});
    }
    const removeCustomer=async(record)=>{
        const res=await deleteCustomer({id:record.id});
        console.log("res",res);
        if(res.code===200){
            message.success("删除成功")
            setParams({
                pagenum:1,
                pagesize:6,
            })
            setCurent(1)
        }else{
            message.warn("删除失败")
        }
    }
    const addCustomer=()=>{
        form.resetFields();
        setCustomerInfo({});
        setOpen(true)
    }
    const columns=[
        {
            title: '客户姓名',
            dataIndex: 'customer_name',
            key: 'customer_name',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title:"总欠款",
            dataIndex:"total_debts",
            key:"total_debts",
            render:text=>text||0
        },
        {
            title: '操作',
            dataIndex: 'option',
            key: 'option',
            render:(_,record)=><>
            <EditOutlined className='edit_button' onClick={()=>{editCustomer(record)}}/> 
            <Popconfirm
                title="确定删除这个客户吗"
                // description="Are you sure to delete this task?"
                onConfirm={()=>{removeCustomer(record)}}
                onCancel={()=>{}}
                okText="确定"
                cancelText="取消"
            >
                <DeleteOutlined className='delete_button'/>
            </Popconfirm>
            
            </>
        },
    ]
    const queryFinish=(v)=>{
        console.log("vvvv",v);
        setParams({...params,pagenum:1,customer_name:v.customer_name})
        setCurent(1);
    }
    const queryCancel=()=>{
        queryForm.resetFields();
        setParams({pagenum:1,pagesize:params.pagesize,customer_name:""})
        setCurent(1);
    }
    //页码或者pagesize改变的回调
    const onChange=(page,pagesize)=>{
        console.log("page",page);
        console.log("pagesize",pagesize)
        setParams({pagenum:page,pagesize})
        setCurent(page);
    }
  return (
    <div>
        <div>
        <Form 
            form={queryForm}
            name="control-hooks"
            onFinish={queryFinish}  
            className={styles.form}     
        >
            <Form.Item
                name="customer_name"
                label="姓名"
                wrapperCol={{span:20}}
                // labelCol={{offset:8}}
            >
                <Input/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                查询
                </Button>
                <Button htmlType="button" onClick={queryCancel}>
                重置
                </Button>    
            </Form.Item>
        </Form>
        <Button type="primary" onClick={addCustomer}>添加客户</Button>
        <p></p>
        <Table columns={columns} dataSource={data.lists} pagination={{total:data.total,pageSize:params.pagesize,onChange,current}} />
        <MyModal open={open} setOpen={setOpen} customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} form={form} setParams={setParams}></MyModal>
        </div>
    </div>
  )
}
