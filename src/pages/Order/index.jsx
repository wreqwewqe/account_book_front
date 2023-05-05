import React,{useEffect,useState} from 'react'
import { Table,Button,Form,Input, Select,Popconfirm, message } from 'antd'
import {orderLists,deleteOrder} from "@/services/order"
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { timestampToDate } from '@/utils/methods';
import MyModal from "./MyModal"
import styles from './index.less'
import TopHeader from '@/components/TopHeader';
export default function Order() {
    const [data,setData]=useState({});
    const [orderInfo,setOrderInfo]=useState({});
    const [open,setOpen]=useState(false);
    const [form] = Form.useForm();
    const [queryForm]=Form.useForm();
    const [current,setCurent]=useState(1);
    const [params,setParams]=useState({
        pagenum:1,
        pagesize:6,
        customer_name:""
    });
    useEffect(()=>{
        getList()
    },[params])
    const getList=async()=>{
        const res=await orderLists(params);
       if(res.code===200){
            console.log("rrrrrrrr")
            setData(res.data)
       }    
    }
    const editOrder=(record)=>{
        console.log("recor",record);
        setOpen(true);
        setOrderInfo({...record});
        setCurent(1)
    }
    const deleteOrder=async (record)=>{
        console.log("record",record)
        const res=await deleteOrder({id:record.id});
        console.log("res",res);
        if(res.code===200){
            message.success("删除成功")
            setParams({
                pagenum:1,
                pagesize:6,
                customer_name:""
            })
        }else{
            message.warn("删除失败")
        }
    }
    const addOrder=()=>{
        form.resetFields();
        setOrderInfo({});
        setOpen(true)
    }
    const columns=[
        {
            title: '客户姓名',
            dataIndex: 'customer_name',
            key: 'customer_name',
        },
        {
            title:"借款金额",
            dataIndex:"amount",
            key:"amount"
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render:text=>text===true?"未还款":"已还清"
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: '订单创建时间',
            dataIndex: 'create_at',
            key: 'create_at',
            render:text=>timestampToDate(text)
        },
        {
            title: '操作',
            dataIndex: 'option',
            key: 'option',
            render:(_,record)=><>
            <EditOutlined className='edit_button' onClick={()=>{editOrder(record)}}/> 
            <Popconfirm
                title="确定删除这个订单吗"
                // description="Are you sure to delete this task?"
                onConfirm={()=>{deleteOrder(record)}}
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
        if(v.status!=="undefined"){
            //选择了status
            setParams({...params,pagenum:1,customer_name:v.customer_name,status:v.status})
        }else{
            //没有选择status
            setParams({...params,pagenum:1,customer_name:v.customer_name})
        }
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
    
    <div >
        
        <div>
        <Form 
            className={styles.form}
            form={queryForm}
            name="control-hooks"
            onFinish={queryFinish}       
        >
            <Form.Item
                name="customer_name"
                label="客户姓名"
                wrapperCol={{span:12}}
                // labelCol={{offset:8}}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="status"
                label="状态"
                wrapperCol={{span:12}}
            >
                <Select 
                    style={{width:120}}
                    options={[
                    {
                        value:false,
                        label:"已还清"
                    },
                    {
                        value:true,
                        label:"未还清"
                    }
                ]}/>
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
        <Button type="primary" onClick={addOrder}>添加订单</Button>
        <p></p>
        <Table columns={columns} dataSource={data.lists} pagination={{total:data.total,pageSize:params.pagesize,onChange,current}} />
        <MyModal open={open} setOpen={setOpen} orderInfo={orderInfo} setOrderInfo={setOrderInfo} form={form} setParams={setParams} setCurent={setCurent}></MyModal>
        </div>
    </div>
  )
}
