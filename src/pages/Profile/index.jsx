import { customerLists } from '@/services/customer';
import { updateUser, uploadImg } from "@/services/users";
import { timestampToDate } from "@/utils/methods";
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Upload, message } from "antd";
import React, { useEffect } from 'react';
import { useModel } from 'umi';

export default function Profile() {
    const [form] = Form.useForm();
    const { initialState,refresh } =useModel('@@initialState');
    
    console.log("initialState",initialState)
    useEffect(()=>{
        totalCustomer().then(values=>{
            // console.log("customer",customers)
            form.setFieldsValue({
                username:initialState.info.username,
                password:initialState.info.password,
                totalCustomer:values.total,
                total_debts:values.total_debts,
                create_at:timestampToDate(initialState.info.create_at)
            })
        })
    },[])
    const totalCustomer=async ()=>{
       const res= await customerLists({
            "pagenum":1,
            "pagesize":6
        }) 
        console.log("rrrrrrrrr",res);
        if(res.code===200){
            return res.data
        }
    }
    const onFinish=async (values)=>{
        console.log("values",values)
        if(values.upload){
            console.log("我能更新")
            let formData=new FormData();
            formData.append(`${localStorage.getItem("parent_uuid")}`,values.upload.file.originFileObj);
            const rr=await uploadImg(formData); 
            console.log("rr",rr);
        }
      
        const res=await updateUser({
            "uuid":localStorage.getItem("parent_uuid"),
            "username":values.username,
            "password":values.password
        })
        if(res.code===200){
            message.success("更新成功")
        }
        refresh();
    }
   
  return (
   <div>
        
      <Form
        form={form}
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        style={{
            maxWidth: 600,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
         <Form.Item
            label="上传头像"
            name="upload"
            
            // rules={[
            //     {
            //     required: true,
            //     message: 'Please input your username!',
            //     },
            // ]}
        >
            <Upload
                accept='.jpg'
                listType="picture"
                maxCount={1}
            >
                <Button icon={<UploadOutlined />}>点击上传头像(仅限.jpg)</Button>
             </Upload>
        </Form.Item>
        <Form.Item
            label="头像"
            name="avatar"
            // rules={[
            //     {
            //     required: true,
            //     message: 'Please input your username!',
            //     },
            // ]}
        >
             <Image src={initialState&&initialState.avatar} />
        </Form.Item>
        <Form.Item
            label="用户名"
            name="username"
            rules={[
                {
                required: true,
                message: '请填写用户名!',
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="密码"
            name="password"
            rules={[
                {
                required: true,
                message: '请填写密码!',
                },
            ]}
        >
            <Input.Password visibilityToggle={false}/>
        </Form.Item>
        <Form.Item
            label="客户人数"
            name="totalCustomer"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
        >
            <Input disabled/>
        </Form.Item>
        <Form.Item
            label="总计未还款"
            name="total_debts"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
        >
            <Input disabled/>
        </Form.Item>
        <Form.Item
            label="账号创建时间"
            name="create_at"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
        >
            <Input disabled/>
        </Form.Item>

        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
        <Button type="primary" htmlType="submit">
            更新
        </Button>
        </Form.Item>
    </Form>
   </div>
  )
}
