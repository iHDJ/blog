import React from 'react';
import { connect } from 'dva';
import { Form, Input, Modal } from 'antd';

@connect()
class CreateArticleModal extends React.Component {
  state = {
    visible: false,
  };

  onCancel = () => {
    this.setState({ visible: false });
  };

  onSubmit = () => {
    const { validateFields } = this.form;

    validateFields().then(values => {
      const { dispatch } = this.props;

      dispatch({
        type: 'index/createArticle',
        payload: {
          title: values.title,
          content: values.content,
        },
      });
    });
  };

  render() {
    const { visible, onCancel } = this.props;

    return (
      <React.Fragment>
        <Modal
          title="Create Article"
          visible={visible}
          onOk={this.onSubmit}
          onCancel={onCancel}
          okButtonProps={{ htmlType: 'submit' }}
        >
          <Form onFinish={this.onSubmit} ref={form => (this.form = form)}>
            <Form.Item name="title" rules={[{ required: true, message: '必须填写文章标题!' }]}>
              <Input placeholder="标题" />
            </Form.Item>

            <Form.Item name="content" rules={[{ required: true, message: '必须填写文章内容!' }]}>
              <Input.TextArea placeholder="内容" />
            </Form.Item>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CreateArticleModal;
