import React, { useState, useEffect } from "react";
import { connect } from "dva";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Table,
  notification,
  Popconfirm,
  Divider,
  Tag,
  Radio
} from "antd";

const { Search } = Input;
import { PageHeaderWrapper } from "@ant-design/pro-layout";

import MessageComponent from "./Message";

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */

const TableList = props => {
  const { messageList, total, dispatch, loading, messageDetail } = props;

  const [state, setState] = useState({
 
    state: "", // 状态 0 是未处理，1 是已处理 ,'' 代表所有留言
    pageNum: 1,
    pageSize: 10
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    handleSearch(state.pageNum, state.pageSize);
  }, []);

  const columns = () => [
    {
      title: "用户名",
      dataIndex: "name"
    },
    {
      title: "email",
      dataIndex: "email"
    },
    {
      title: "头像",
      dataIndex: "avatar"
    },
    {
      title: "phone",
      dataIndex: "phone"
    },
    // {
    // 	title: '用户介绍',
    // 	dataIndex: 'introduce',
    // },
    {
      title: "内容",
      width: 300,
      dataIndex: "content"
    },
    {
      title: "状态",
      dataIndex: "state",
      render: val => (val ? <Tag color="green">已经处理</Tag> : <Tag color="red">未处理</Tag>)
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      sorter: true,
      render: val => <span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>
    },
    {
      title: "操作",
      width: 150,
      render: (text, record) => (
        <div>
          <Fragment>
            <a onClick={() => showReplyModal(true, record)}>回复</a>
          </Fragment>
          <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(text, record)}>
            <a href="javascript:;">Delete</a>
          </Popconfirm>
        </div>
      )
    }
  ];

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  function handleChangePageParam(pageNum, pageSize) {
    setState({
      ...state,
      pageNum,
      pageSize
    });
    handleSearch();
  }

  const showReplyModal = (text, record) => {
    const params = {
      id: record._id
    };
    new Promise(resolve => {
      dispatch({
        type: "message/getMessageDetail",
        payload: {
          resolve,
          params
        }
      });
    }).then(res => {
      // console.log('res :', res)
      if (res.code === 0) {
        setVisible(true);
      } else {
        notification.error({
          message: res.message
        });
      }
    });
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const handleSearch = (v) => {
    const params = {
      keyword: v,
      state: state.state,
      pageNum: state.pageNum,
      pageSize: state.pageSize
    };
    new Promise(resolve => {
      dispatch({
        type: "message/queryMessage",
        payload: {
          resolve,
          params
        }
      });
    }).then(res => {
      console.log("res :", res);
      if (res.code === 0) {
      } else {
        notification.error({
          message: res.message
        });
      }
    });
  };

  const handleDelete = record => {
    const params = {
      id: record._id
    };
    new Promise(resolve => {
      dispatch({
        type: "message/delMessage",
        payload: {
          resolve,
          params
        }
      });
    }).then(res => {
      // console.log('res :', res);
      if (res.code === 0) {
        notification.success({
          message: res.message
        });
        handleSearch(state.pageNum, state.pageSize);
      } else {
        notification.error({
          message: res.message
        });
      }
    });
  };

  const pagination = () => {
    return {
      total,
      defaultCurrent: state.pageNum,
      pageSize: state.pageSize,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        // console.log('current, pageSize :', current, pageSize);
        handleChangePageParam(current, pageSize);
      },
      onChange: (current, pageSize) => {
        handleChangePageParam(current, pageSize);
      }
    };
  };

  return (
    <PageHeaderWrapper title="留言管理">
      <Card bordered={false}>
        <Form layout="inline" style={{ marginBottom: "20px" }}>
         

          <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="space-around" align="middle">
            <Col span={24}>
              <Search
                style={{ textAlign: "center" }}
                placeholder="留言内容"
                enterButton
                size="large"
 
                loading={loading}
                onSearch={value => handleSearch(value)}
              />
            </Col>
          </Row>

          <Row
 
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
                value={state.state}
              >
                <Radio value="">所有 </Radio>
                <Radio value={0}>未处理</Radio>
                <Radio value={1}>已处理</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Form>

       

        <Table
          pagination={pagination()}
          loading={loading}
          rowKey={record => record._id}
          columns={columns()}
          bordered
          dataSource={messageList}
        />
      </Card>
      <MessageComponent visible={visible} handleOk={handleOk} handleCancel={handleCancel} />
    </PageHeaderWrapper>
  );
};

export default connect(({ message, loading }) => {
  const { messageList, total, messageDetail } = message;
  return {
    messageList,
    messageDetail,
    total,
    loading: loading.models.message
  };
})(Form.create()(TableList));
