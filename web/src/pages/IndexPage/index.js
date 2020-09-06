import React from 'react';
import { connect } from 'dva';
import { Card, List, Button, Row, Col } from 'antd';
import CreateArticleModal from './components/CreateArticleModal';
import router from 'umi/router';

@connect(state => {
  return {
    currentUser: state.user.currentUser,
    articles: state.index.articles,
    loading: state.loading.effects['index/getArticles'],
  };
})
class IndexPage extends React.Component {
  state = {
    showModal: false,
  };

  onCancelModal = () => {
    this.setState({ showModal: false });
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'index/getArticles',
      payload: {},
    });
  }

  render() {
    const { articles, currentUser } = this.props;
    const { showModal } = this.state;

    return (
      <React.Fragment>
        <Row align="middle" justify="center" style={{ paddingTop: 15 }}>
          <Col lg={12}>
            <Button
              disabled={!currentUser.is_admin}
              onClick={() => {
                this.setState({
                  showModal: true,
                });
              }}
              block
            >
              创建文章
            </Button>

            <Card>
              <List
                size="large"
                itemLayout="horizontal"
                dataSource={articles}
                renderItem={article => (
                  <List.Item
                    onClick={() => {
                      router.push(`/articles/${article.id}`)
                    }}
                  >
                    <List.Item.Meta title={article.title} />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        <CreateArticleModal visible={showModal} onCancel={this.onCancelModal} />
      </React.Fragment>
    );
  }
}

export default IndexPage;
