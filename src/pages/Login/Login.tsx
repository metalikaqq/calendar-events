import { Card, Layout, Row } from 'antd';
import React, { FC } from 'react';
import './Login.css';
import LoginForm from '../../components/LoginForm';

const Login:FC = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" className="login">
        <Card>
          <LoginForm />
        </Card>
      </Row>
    </Layout>
  );
}

export default Login;