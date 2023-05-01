import React,{useEffect,useState} from 'react'
import { Table,Button,Form,Input } from 'antd'
import {customerLists} from "@/services/customer"
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import MyModal from "./MyModal"
import styles from './index.less'
export default function Customer() {
    
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
    const deleteCustomer=()=>{

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
            key:"total_debts"
        },
        {
            title: '操作',
            dataIndex: 'option',
            key: 'option',
            render:(_,record)=><>
            <EditOutlined className='edit_button' onClick={()=>{editCustomer(record)}}/> 
            <DeleteOutlined className='delete_button' onClick={deleteCustomer}/>
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
        <Form 
            form={queryForm}
            name="control-hooks"
            onFinish={queryFinish}       
        >
            <Form.Item
                name="customer_name"
                label="姓名"
                wrapperCol={{span:4}}
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
  )
}
