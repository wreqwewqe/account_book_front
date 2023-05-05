import React,{useEffect, useState} from 'react'
import { Modal,Form,Input, message,Select,InputNumber  } from 'antd';
import { updateOrder,CreateOrder } from '@/services/order';
import {customerLists} from '@/services/customer'

export default function MyModal({open,setOpen,orderInfo,setOrderInfo,form,setParams,setCurrent}) {
    const [customerList,setCustomerList]=useState([]);
    useEffect(()=>{
        console.log("我更新了")
        console.log("orderInfo",orderInfo)
        form.setFieldsValue(orderInfo)
    },[orderInfo])
    const onCancel=()=>{
        setOpen(false)
    }

    useEffect(()=>{
        customerLists({pagenum:1,pagesize:10000}).then(res=>{
            console.log("www",res);
            setCustomerList(res.data.lists)
        })
    },[])
  return (
    <Modal
        open={open}
        title={Object.keys(orderInfo).length>0?"更新订单":"添加订单"}
        okText="完成"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
            form
            .validateFields()
            .then(async(values) => {
                if(Object.keys(orderInfo).length>0){
                    //更新
                    console.log("valus",values);
                    const res=await updateOrder({...values,
                        amount:Number(form.getFieldValue("amount")),
                        id:orderInfo.id,

                    });
                    if(res.code===200){
                        message.success("更新成功")
                    }
                    setOpen(false);
                    setParams({
                        pagenum:1,
                        pagesize:6
                    })
                    setCurrent(1)
                    
                    // console.log("res",res);
                }else{
                    console.log("我来添加了",values)
                    
                    //添加
                    const res=await CreateOrder({...values,
                        remark:form.getFieldValue("remark")?form.getFieldValue("remark"):"",
                        amount:Number(form.getFieldValue("amount"),
                        )})
                    if(res.code===200){
                        message.success("创建成功")
                    }
                    setOpen(false);
                    setParams({
                        pagenum:1,
                        pagesize:6
                    })
                    setCurrent(1)
                }
               
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
        }}
    >
        <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
            modifier: 'public',
            }}
        >
            {Object.keys(orderInfo).length>0?
            //编辑
            <Form.Item
                name="customer_name"
                label="姓名"
                rules={[
                    {
                    required: true,
                    message: '请输入姓名',
                    
                    },
                ]}
            >
                <Input  />
            </Form.Item>:
            //添加
            <Form.Item
                name="customer_id"
                label="姓名"
                rules={[
                    {
                    required: true,
                    message: '请输入姓名',
                    
                    },
                ]}
            >
                <Select  
                    options={customerList.map(item=>({"label":item.customer_name,"value":item.id}))}
                />
            </Form.Item>
            }
            <Form.Item
                name="amount"
                label="金额"
                rules={[
                    {
                    required: true,
                    message: '请输入金额',
                    // type:"number"
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="remark"
                label="借款备注"
                // rules={[
                //     {
                //     required: true,
                //     message: '请输入金额',
                //     // type:"number"
                //     },
                // ]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="status" label="状态">
                <Select
                    // defaultValue={orderInfo.status}
                    // style={{
                    //     width: 120,
                    // }}
                    options={[
                        {
                            value: true,
                            label: '未还款',
                        },
                        {
                            value: false,
                            label: '已还款',
                        },
                    ]}
                />
            </Form.Item>
            
        </Form>
        
    </Modal>
  )
}