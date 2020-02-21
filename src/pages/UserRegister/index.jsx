import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
<<<<<<< HEAD
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
=======
>>>>>>> 优化评论管理
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const passwordStatusMap = {
<<<<<<< HEAD
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userregister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userregister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userregister.strength.short" />
    </div>
  ),
=======
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：太短</div>,
>>>>>>> 优化评论管理
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

class UserRegister extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
  };

  interval = undefined;

  componentDidUpdate() {
    const { userRegister, form } = this.props;
    const account = form.getFieldValue('mail');

    if (userRegister.status === 'ok') {
      message.success('注册成功！');
      router.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({
      count,
    });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({
        count,
      });

      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(
      {
        force: true,
      },
      (err, values) => {
        if (!err) {
          const { prefix } = this.state;
          dispatch({
            type: 'userRegister/submit',
            payload: { ...values, prefix },
          });
        }
      },
    );
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;

    if (value && value !== form.getFieldValue('password')) {
<<<<<<< HEAD
      callback(
        formatMessage({
          id: 'userregister.password.twice',
        }),
      );
=======
      callback('两次输入的密码不匹配!');
>>>>>>> 优化评论管理
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;

    if (!value) {
      this.setState({
<<<<<<< HEAD
        help: formatMessage({
          id: 'userregister.password.required',
        }),
=======
        help: '请输入密码！',
>>>>>>> 优化评论管理
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });

      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }

      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;

        if (value && confirmDirty) {
          form.validateFields(['confirm'], {
            force: true,
          });
        }

        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value,
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;
    return (
      <div className={styles.main}>
<<<<<<< HEAD
        <h3>
          <FormattedMessage id="userregister.register.register" />
        </h3>
=======
        <h3>注册</h3>
>>>>>>> 优化评论管理
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('mail', {
              rules: [
                {
                  required: true,
<<<<<<< HEAD
                  message: formatMessage({
                    id: 'userregister.email.required',
                  }),
                },
                {
                  type: 'email',
                  message: formatMessage({
                    id: 'userregister.email.wrong-format',
                  }),
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({
                  id: 'userregister.email.placeholder',
                })}
              />,
            )}
=======
                  message: '请输入邮箱地址！',
                },
                {
                  type: 'email',
                  message: '邮箱地址格式错误！',
                },
              ],
            })(<Input size="large" placeholder="邮箱" />)}
>>>>>>> 优化评论管理
          </FormItem>
          <FormItem help={help}>
            <Popover
              getPopupContainer={node => {
                if (node && node.parentNode) {
                  return node.parentNode;
                }

                return node;
              }}
              content={
                <div
                  style={{
                    padding: '4px 0',
                  }}
                >
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
<<<<<<< HEAD
                    <FormattedMessage id="userregister.strength.msg" />
=======
                    请至少输入 6 个字符。请不要使用容易被猜到的密码。
>>>>>>> 优化评论管理
                  </div>
                </div>
              }
              overlayStyle={{
                width: 240,
              }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
<<<<<<< HEAD
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({
                    id: 'userregister.password.placeholder',
                  })}
                />,
              )}
=======
              })(<Input size="large" type="password" placeholder="至少6位密码，区分大小写" />)}
>>>>>>> 优化评论管理
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
<<<<<<< HEAD
                  message: formatMessage({
                    id: 'userregister.confirm-password.required',
                  }),
=======
                  message: '请确认密码！',
>>>>>>> 优化评论管理
                },
                {
                  validator: this.checkConfirm,
                },
              ],
<<<<<<< HEAD
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({
                  id: 'userregister.confirm-password.placeholder',
                })}
              />,
            )}
=======
            })(<Input size="large" type="password" placeholder="确认密码" />)}
>>>>>>> 优化评论管理
          </FormItem>
          <FormItem>
            <InputGroup compact>
              <Select
                size="large"
                value={prefix}
                onChange={this.changePrefix}
                style={{
                  width: '20%',
                }}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: true,
<<<<<<< HEAD
                    message: formatMessage({
                      id: 'userregister.phone-number.required',
                    }),
                  },
                  {
                    pattern: /^\d{11}$/,
                    message: formatMessage({
                      id: 'userregister.phone-number.wrong-format',
                    }),
=======
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^\d{11}$/,
                    message: '手机号格式错误！',
>>>>>>> 优化评论管理
                  },
                ],
              })(
                <Input
                  size="large"
                  style={{
                    width: '80%',
                  }}
<<<<<<< HEAD
                  placeholder={formatMessage({
                    id: 'userregister.phone-number.placeholder',
                  })}
=======
                  placeholder="手机号"
>>>>>>> 优化评论管理
                />,
              )}
            </InputGroup>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
<<<<<<< HEAD
                      message: formatMessage({
                        id: 'userregister.verification-code.required',
                      }),
                    },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder={formatMessage({
                      id: 'userregister.verification-code.placeholder',
                    })}
                  />,
                )}
=======
                      message: '请输入验证码！',
                    },
                  ],
                })(<Input size="large" placeholder="验证码" />)}
>>>>>>> 优化评论管理
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={!!count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
<<<<<<< HEAD
                  {count
                    ? `${count} s`
                    : formatMessage({
                        id: 'userregister.register.get-verification-code',
                      })}
=======
                  {count ? `${count} s` : '获取验证码'}
>>>>>>> 优化评论管理
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
<<<<<<< HEAD
              <FormattedMessage id="userregister.register.register" />
            </Button>
            <Link className={styles.login} to="/user/login">
              <FormattedMessage id="userregister.register.sign-in" />
=======
              注册
            </Button>
            <Link className={styles.login} to="/user/login">
              使用已有账户登录
>>>>>>> 优化评论管理
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default connect(({ userRegister, loading }) => ({
  userRegister,
  submitting: loading.effects['userRegister/submit'],
}))(Form.create()(UserRegister));
