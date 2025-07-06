import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { Link } from "react-router";

const AdminSignup = () => {
  const AdminSignupHandle=async(values)=>{
    try{
       const  {email,password} = values

       const res = await fetch('https://schoolmanagementsystem-1-i1d8.onrender.com/api/auth/AdminLogin',{
        method:'POST',
        credentials: 'include', 
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({email:email,password:password})

       })
           if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(JSON.stringify(res))


    }catch(err){
        console.log(err)
    }

  }

  const onFinish = values => {
    console.log('Received values of form: ', values);
    AdminSignupHandle(values)
    
  };
  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
      method='POST'

    >
      <Link to="/StudentLogin">Student Login</Link>;
      <Link to="/TeacherLogin">Teacher Login</Link>;
      Admin
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
        or <a href="">Register now!</a>
      </Form.Item>
    </Form>
  );
};
export default AdminSignup;