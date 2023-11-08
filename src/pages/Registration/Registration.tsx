import { Card, Layout, Row } from 'antd';
import React, { FC } from 'react';
import RegistrationForm from '../../components/RegistrationForm';

const Registration = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" className="login">
        <Card>
          <RegistrationForm />
        </Card>
      </Row>
    </Layout>
  )
}

export default Registration;