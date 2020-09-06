import React from 'react'
import { connect } from 'dva';
import { Row, Col, Card, Typography, Comment, Form, Input, Button, Tooltip } from 'antd';
import moment from 'moment';

const { Title, Paragraph } = Typography;

@connect(({ user: { currentUser }, ArticlePage: { article, tags, comments }, loading }, route) => {
  return {
    id: route.match.params.id,
    article,
    tags,
    comments,
    currentUser,
    articleLoading: loading.effects["ArticlePage/getArticle"],
    submitting: loading.effects["ArticlePage/createComment"],
  }
})
class ArticlePage extends React.Component {
  state = {
    commentContent: '',
  };

  componentDidMount() {
    const { dispatch, id } = this.props;

    dispatch({
      type: "ArticlePage/getArticle",
      payload: {
        id
      }
    })

    dispatch({
      type: "ArticlePage/getComments",
      payload: {
        article_id: id,
      }
    })
  }

  onSubmitComment = () => {
    const { commentContent } = this.state;

    if (!commentContent) {
      return
    }

    const { dispatch, id } = this.props;

    dispatch({
      type: "ArticlePage/createComment",
      payload: {
        content: commentContent,
        article_id: id,
      }
    })

    this.setState({
      commentContent: ""
    })
  }

  onWriteComment = (e) => {
    this.setState({commentContent: e.target.value})
  }

  onDestroyComment = (id) => () => {
    const { dispatch } = this.props;

    dispatch({
      type: "ArticlePage/destroyComment",
      payload: {
        id
      }
    })
  }

  render() {
    const { article, tags, comments, articleLoading, submitting, currentUser } = this.props

    return (
      <React.Fragment>
        <Row justify='center' style={{marginTop: 15}}>
          <Col lg={12}>
            <Card hoverable loading={articleLoading} style={{minHeight: 500}}>
              <Title>
                {article.title}
              </Title>

              <Paragraph>
                {article.content}
              </Paragraph>
            </Card>

            <Card hoverable style={{marginTop: 15}}>
              <Paragraph>评论</Paragraph>

              <Comment
                content={
                  <Editor
                    onChange={this.onWriteComment}
                    onSubmit={this.onSubmitComment}
                    submitting={submitting}
                    value={this.state.commentContent}
                  />
                }
              />

              {comments.map(comment => {
                const actions = []

                if (currentUser.is_admin || currentUser.id == comment.user_id) {
                  actions.push(
                    <Button onClick={this.onDestroyComment(comment.id)}>
                      删除
                    </Button>
                  )
                }

                return (
                  <Comment
                    actions={actions}
                    author={<a>{comment.user.name}</a>}
                    content={<p>{comment.content}</p>}
                    datetime={
                      <Tooltip title={moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(comment.created_at).fromNow()}</span>
                      </Tooltip>
                    }
                  />
                )
              })}
            </Card>

          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default ArticlePage;


const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        提交评论
      </Button>
    </Form.Item>
  </>
)
