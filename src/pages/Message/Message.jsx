import React, { useMemo, useState } from "react";
import { Row, Col, Input, Modal, Radio, notification, Button } from "antd";
import { connect } from "dva";
import Item from "antd/lib/list/Item";

const globalStyle = {
  marginBottom: 20
};
const titleStyle = {
  textAlign: "left",
  borderLeft: "5px solid #1890FF",
  paddingLeft: "10px",
  fontSize: "20px",
  margin: "20px 0"
};
const contentStyle = {
  textAlign: "center",
  padding: "30px 0"
};
const normalLeft = {
  textAlign: "left",
  paddingBottom: 20,
  borderTop: "1px solid #eee"
};
const { TextArea } = Input;

const MessageComponent = props => {
  const { dispatch, messageDetail } = props;
  const [state, setState] = useState({
    state: "",
    content: ""
  });

  function submit() {
    const { messageDetail } = props.message;
    const params = {
      id: messageDetail._id,
      state: state.state,
      content: state.content
    };
    new Promise(resolve => {
      dispatch({
        type: "message/addReplyMessage",
        payload: {
          resolve,
          params
        }
      });
    }).then(res => {
      if (res.code === 0) {
        notification.success({
          message: res.message
        });
      } else {
        notification.error({
          message: res.message
        });
      }
    });
  }

  const messageInfo = useMemo(
    () => [
      { key: "用户名:", value: messageDetail.name },
      { key: "手机:", value: messageDetail.phone },
      { key: "邮箱:", value: messageDetail.email },
      { key: "介绍:", value: messageDetail.introduce }
    ],
    [messageDetail]
  );

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const list = messageDetail.reply_list.map(e => (
    <div key={e._id} style={contentStyle}>
      {e.content}
    </div>
  ));

  return (
    <div>
      <Modal
        title="留言详情与回复"
        visible={props.visible}
        onOk={props.handleOk}
        width="1000px"
        onCancel={props.handleCancel}
      >
        <Row style={globalStyle}>
          <div style={titleStyle}> 用户</div>
          <div style={contentStyle}>
            {messageInfo.map(Item => {
              return (
                <>
                  <Col style={globalStyle} span={6}>
                    {Item.key}
                  </Col>
                  <Col style={globalStyle} span={6}>
                    {Item.value}
                  </Col>
                </>
              );
            })}
          </div>
        </Row>
        <Row style={normalLeft}>
          <div style={titleStyle}> 留言 </div>
          <div style={contentStyle}> {messageDetail.content}</div>
        </Row>
        <Row style={normalLeft}>
          <div style={titleStyle}> 回复内容 </div>
          {list || <div style={contentStyle}>暂无回复！</div>}
        </Row>
        <Row style={normalLeft}>
          <div style={titleStyle}> 添加回复</div>
          <TextArea
            size="large"
            placeholder="添加回复内容"
            name="content"
            value={state.content}
            onChange={e => handleChange(e)}
          />

          <Row
            gutter={[8, 30]}
            style={{ fontSize: 15 }}
            type="flex"
            justify="space-around"
            align="middle"
          >
            <h4> 选择状态: </h4>
            <Col span={18}>
              <Radio.Group
                name="state"
                style={{ width: 300, marginTop: 20, marginBottom: 20 }}
                onChange={e => handleChange(e)}
                value={messageDetail.state}
              >
                <Radio value={0}>未处理</Radio>
                <Radio value={1}>已处理</Radio>
              </Radio.Group>
            </Col>
          </Row>

          <div>
            <Button style={{ marginTop: 20 }} onClick={submit} type="primary">
              提交回复
            </Button>
          </div>
        </Row>
      </Modal>
    </div>
  );
};

export default connect(({ message }) => {
  return {
    messageDetail: message.messageDetail
  };
})(MessageComponent);
