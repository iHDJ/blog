import React from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Form, Input, Button } from 'antd';

@connect()
class UserSignInPage extends React.Component {
  onSubmit = ({ username, password }) => {
    const { dispatch } = this.props;

    console.log(username, password)
    dispatch({
      type: "UserSignInPage/Login",
      payload: {
        username,
        password,
      }
    })
  };

  render() {
    return (
      <React.Fragment>
        <Row align="middle" justify="center" type="flex">
          <Col lg={8} />
          <Col lg={8}>
            <Card style={{ marginTop: 100 }}>
              <Form onFinish={this.onSubmit}>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input placeholder="Password" />
                </Form.Item>

                <Button type="primary" align="right" htmlType="submit">
                  提交
                </Button>

                <Button style={{ marginLeft: 5 }}>没有账号，前往注册</Button>
              </Form>
            </Card>
          </Col>
          <Col lg={8} />
        </Row>
      </React.Fragment>
    );
  }
}

export default UserSignInPage;
