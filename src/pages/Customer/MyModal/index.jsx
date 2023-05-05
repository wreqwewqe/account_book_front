import React,{useEffect} from 'react'
import { Modal,Form,Input, message } from 'antd';
import { updateCustomer,createCustomer } from '@/services/customer';

export default function MyModal({open,setOpen,customerInfo,setCustomerInfo,form,setParams}) {
    useEffect(()=>{
        console.log("我更新了")
        console.log("customerInfo",customerInfo)
        form.setFieldsValue(customerInfo)
    },[customerInfo])
    const onCancel=()=>{
        setOpen(false)
    }
  return (
    <Modal
        open={open}
        title={Object.keys(customerInfo).length>0?"编辑用户":"添加用户"}
        okText="完成"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
            form
            .validateFields()
            .then(async(values) => {
                if(Object.keys(customerInfo).length>0){
                    //更新
                    console.log("我来更新了",customerInfo)
                    console.log("values",values)
                    const res=await updateCustomer({...values,id:customerInfo.id});
                    if(res.code===200){
                        message.success("更新成功")
                    }
                    setOpen(false);
                    setParams({
                        pagenum:1,
                        pagesize:6
                    })
                    
                    // console.log("res",res);
                }else{
                    console.log("我来编辑了")
                    //编辑
                    const res=await createCustomer({...values,parent_uuid:localStorage.getItem("parent_uuid")})
                    if(res.code===200){
                        message.success("创建成功")
                       
                    }
                    setOpen(false);
                    setParams({
                        pagenum:1,
                        pagesize:6
                    })
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
                <Input />
            </Form.Item>
            <Form.Item name="phone" label="手机号">
                <Input/>
            </Form.Item>
            
        </Form>
        
    </Modal>
  )
}