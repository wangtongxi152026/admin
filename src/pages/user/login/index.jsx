import { Alert, Checkbox, Icon } from 'antd';
<<<<<<< HEAD
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
=======
>>>>>>> 优化评论管理
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
<<<<<<< HEAD
=======

>>>>>>> 优化评论管理
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

class Login extends Component {
  loginForm = undefined;
<<<<<<< HEAD
  state = {
    type: 'account',
    autoLogin: true
=======

  state = {
    type: 'account',
    autoLogin: true,
>>>>>>> 优化评论管理
  };

  changeAutoLogin = e => {
    this.setState({
<<<<<<< HEAD
      autoLogin: e.target.checked
=======
      autoLogin: e.target.checked,
>>>>>>> 优化评论管理
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        // payload: { ...values, type }
<<<<<<< HEAD
        payload: { ...values }
      });
    }
  };
  onTabChange = type => {
    this.setState({
      type
=======
        payload: { ...values },
      });
    }
  };

  onTabChange = type => {
    this.setState({
      type,
>>>>>>> 优化评论管理
    });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['mobile'], {}, async (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;

          try {
            const success = await dispatch({
              type: 'login/getCaptcha',
<<<<<<< HEAD
              payload: values.mobile
=======
              payload: values.mobile,
>>>>>>> 优化评论管理
            });
            resolve(!!success);
          } catch (error) {
            reject(error);
          }
        }
      });
    });

  renderMessage = content => (
<<<<<<< HEAD
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
=======
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
>>>>>>> 优化评论管理
  );

  render() {
    const { userLogin = {}, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
<<<<<<< HEAD
          <Tab
            key="account"
            tab={formatMessage({
              id: 'user-login.login.tab-login-credentials'
            })}
          >
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: 'user-login.login.message-invalid-credentials'
                })
              )}
            <UserName
              name="email"
              placeholder={`${formatMessage({
                id: 'user-login.login.userName'
              })}: admin or user`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.userName.required'
                  })
                }
=======
          <Tab key="account" tab="账户密码登录">
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误（admin/ant.design）')}
            <UserName
              name="email"
              placeholder={`${'用户名'}: admin or user`}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
>>>>>>> 优化评论管理
              ]}
            />
            <Password
              name="password"
<<<<<<< HEAD
              placeholder={`${formatMessage({
                id: 'user-login.login.password'
              })}: ant.design`}
              rules={[
                { required: true, message: formatMessage({ id: 'user-login.password.required' }) }
=======
              placeholder={`${'密码'}: ant.design`}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
>>>>>>> 优化评论管理
              ]}
              onPressEnter={e => {
                e.preventDefault();

                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
<<<<<<< HEAD
          <Tab
            key="mobile"
            tab={formatMessage({
              id: 'user-login.login.tab-login-mobile'
            })}
          >
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: 'user-login.login.message-invalid-verification-code'
                })
              )}
            <Mobile
              name="mobile"
              placeholder={formatMessage({
                id: 'user-login.phone-number.placeholder'
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.phone-number.required'
                  })
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({
                    id: 'user-login.phone-number.wrong-format'
                  })
                }
=======
          <Tab key="mobile" tab="手机号登录">
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage('验证码错误')}
            <Mobile
              name="mobile"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
>>>>>>> 优化评论管理
              ]}
            />
            <Captcha
              name="captcha"
<<<<<<< HEAD
              placeholder={formatMessage({
                id: 'user-login.verification-code.placeholder'
              })}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({
                id: 'user-login.form.get-captcha'
              })}
              getCaptchaSecondText={formatMessage({
                id: 'user-login.captcha.second'
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.verification-code.required'
                  })
                }
=======
              placeholder="验证码"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText="获取验证码"
              getCaptchaSecondText="秒"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
>>>>>>> 优化评论管理
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
<<<<<<< HEAD
              <FormattedMessage id="user-login.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
          </div>
          {/* <Submit loading={submitting}> */}
          <Submit>
            <FormattedMessage id="user-login.login.login" />
          </Submit>


          {/* 其它方式 */}
          <div className={styles.other}>
            <FormattedMessage id="user-login.login.sign-in-with" />
=======
              自动登录
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              忘记密码
            </a>
          </div>
          {/* <Submit loading={submitting}> */}
          <Submit>登录</Submit>

          {/* 其它方式 */}
          <div className={styles.other}>
            其他登录方式
>>>>>>> 优化评论管理
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
<<<<<<< HEAD
              <FormattedMessage id="user-login.login.signup" />
=======
              注册账户
>>>>>>> 优化评论管理
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default connect(({ login, loading }) => ({
  userLogin: login,
<<<<<<< HEAD
  submitting: loading.effects['login/login']
=======
  submitting: loading.effects['login/login'],
>>>>>>> 优化评论管理
}))(Login);
