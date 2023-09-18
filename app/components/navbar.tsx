import styles from "./home.module.scss";
import { GoPerson } from "react-icons/go";
import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Input } from 'antd';

export function NavBar(props: any) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const showLogin = () => {
    setIsLoginOpen(true);
  };

  const handleLoginOk = () => {
    setIsLoginOpen(false);
  };

  const handleLoginCancel = () => {
    setIsLoginOpen(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <>
      <div className={styles["NavSideBar"]}>
        <div className={styles["NavButton"] + " " + styles["Select"]}>
          <span className={styles["text-gradient-nav"]}>聊</span>
        </div>
        <div className={styles["NavButton"]}>
          <span className={styles["text-gradient-nav"]}>绘</span>
        </div>
        <div className={styles["NavButton"]}>
          <span className={styles["text-gradient-nav"]}>阅</span>
        </div>
        <div className={styles["NavButton"]}>
          <span className={styles["text-gradient-nav"]}>想</span>
        </div>

        <div className={styles["nav-user-button"]} onClick={showLogin}>
          <GoPerson className={styles["user-login-icon"]} />
        </div>
      </div>


      {window.innerWidth > 600 ?
        <Modal title="登陆"
          open={isLoginOpen}
          onOk={handleLoginOk}
          onCancel={handleLoginCancel}
          footer={[
            <Button type="primary" htmlType="submit" style={{ marginRight: '20px', width: "100px" }} key="login">
              登陆
            </Button>,
            <Button type="primary" onClick={handleLoginCancel} style={{ marginRight: '120px', width: "100px" }} key="back">
              返回
            </Button>,
          ]}
        >
          <img src="./images/login.png" width={'100%'} style={{ marginBottom: '20px' }}></img>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 720 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="用户名"
              name="username"
              rules={[{ message: 'Please input your username!' }]}
            >
              <Input style={{ maxWidth: 256 }} />
            </Form.Item>

            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[{ message: 'Please input your password!' }]}
            >
              <Input type="password" style={{ maxWidth: 256 }} />
            </Form.Item>
          </Form>
        </Modal>
        :

        <Modal title="登陆"
          open={isLoginOpen}
          onOk={handleLoginOk}
          onCancel={handleLoginCancel}
          footer={[
            <Button type="primary" key="login" htmlType="submit" style={{ marginRight: '10px', width: "90px" }}>
              登陆
            </Button>,
            <Button type="primary" key="back" onClick={handleLoginCancel} style={{ marginRight: '60px', width: "90px" }}>
              返回
            </Button>,
          ]}
        >
          <img src="./images/login.png" width={'100%'} style={{ marginBottom: '20px' }}></img>
          <Form
            name="basic"
            labelCol={{ span: 1 }}
            wrapperCol={{ span: 1 }}
            style={{ maxWidth: 256 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="用户名"
              name="username"
              rules={[{ message: 'Please input your username!' }]}
            >
              <Input style={{ maxWidth: 256,marginLeft:'30px' }} />
            </Form.Item>

            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[{ message: 'Please input your password!' }]}
            >
              <Input type="password" style={{ maxWidth: 256,marginLeft:'30px' }} />
            </Form.Item>
          </Form>
        </Modal>}
    </>
  );
}