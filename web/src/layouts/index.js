import React from 'react';
import styles from './index.css';
import { connect } from 'dva';

@connect(({ user: { currentUser } }) => {
  return {
    currentUser,
  }
})
class BasicLayout extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: "user/fetchUser",
    })
  }

  onSignOut = () => {
    const { dispatch } = this.props;

    dispatch({
      type: "user/signOut",
    })
  }

  renderUser = () => {
    const { currentUser } = this.props;

    if (currentUser.id) {
      return (
        <React.Fragment>
          <div>welcome {currentUser.name}</div>
          <a onClick={this.onSignOut}>退出</a>
        </React.Fragment>
      )
    }

    return (
      <div>
        <a href='/sign_in'>登入</a>
        <a href='/sign_up'>注册</a>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.normal}>
          <h1 className={styles.title}>My Blog</h1>
          <div style={{background: 'darkslateblue', color: "#FFF"}}>
            {this.renderUser()}
          </div>
        </div>

        {this.props.children}
      </React.Fragment>
    )
  }
}

export default BasicLayout;
