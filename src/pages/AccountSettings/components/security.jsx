<<<<<<< HEAD
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
=======
>>>>>>> 优化评论管理
import React, { Component, Fragment } from 'react';
import { List } from 'antd';

const passwordStrength = {
<<<<<<< HEAD
  strong: (
    <span className="strong">
      <FormattedMessage id="accountsettings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="accountsettings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="accountsettings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
=======
  strong: <span className="strong">强</span>,
  medium: <span className="medium">中</span>,
  weak: <span className="weak">弱 Weak</span>,
>>>>>>> 优化评论管理
};

class SecurityView extends Component {
  getData = () => [
    {
<<<<<<< HEAD
      title: formatMessage(
        {
          id: 'accountsettings.security.password',
        },
        {},
      ),
      description: (
        <Fragment>
          {formatMessage({
            id: 'accountsettings.security.password-description',
          })}
          ：{passwordStrength.strong}
        </Fragment>
      ),
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.phone',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountsettings.security.phone-description',
        },
        {},
      )}：138****8293`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.question',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountsettings.security.question-description',
        },
        {},
      ),
      actions: [
        <a key="Set">
          <FormattedMessage id="accountsettings.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.email',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountsettings.security.email-description',
        },
        {},
      )}：ant***sign.com`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.mfa',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountsettings.security.mfa-description',
        },
        {},
      ),
      actions: [
        <a key="bind">
          <FormattedMessage id="accountsettings.security.bind" defaultMessage="Bind" />
        </a>,
      ],
=======
      title: '账户密码',
      description: <Fragment>当前密码强度： ：{passwordStrength.strong}</Fragment>,
      actions: [<a key="Modify">修改</a>],
    },
    {
      title: '密保手机',
      description: `${'已绑定手机：'}：138****8293`,
      actions: [<a key="Modify">修改</a>],
    },
    {
      title: '密保问题',
      description: '未设置密保问题，密保问题可有效保护账户安全',
      actions: [<a key="Set">设置</a>],
    },
    {
      title: '备用邮箱',
      description: `${'已绑定邮箱：'}：ant***sign.com`,
      actions: [<a key="Modify">修改</a>],
    },
    {
      title: 'MFA 设备',
      description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
      actions: [<a key="bind">绑定</a>],
>>>>>>> 优化评论管理
    },
  ];

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default SecurityView;
