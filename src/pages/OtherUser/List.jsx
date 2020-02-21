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
  Tag,
  Radio
} from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
 

const { Search } = Input;
/* eslint react/no-multi-comp:0 */

const TableList = props => {
  const { loading, dispatch, userList, total } = props;

  const [state, setState] = useState({
    keyword: "",
    type: "", // 1 :其他友情用户 2: 是管理员的个人用户 ,'' 代表所有用户
    pageNum: 1,
    pageSize: 10
  });

  const columns = () => {
    return [
      {
        title: "用户名",
        dataIndex: "name"
      },
      {
        title: "邮箱",
        dataIndex: "email"
      },
      {
        title: "手机",
        dataIndex: "phone"
      },
      {
        title: "头像",
        dataIndex: "img_url"
      },
      {
        title: "个人介绍",
        width: 250,
        dataIndex: "introduce"
      },
      {
        title: "类型",
        dataIndex: "type",
        // 0：管理员 1：其他用户
        render: val => (!val ? <Tag color="green">管理员</Tag> : <Tag color="blue">其他用户</Tag>)
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        sorter: true,
        render: val => <span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>
      },
      {
        title: "操作",
        render: (text, record) => (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(text, record)}>
            <a href="javascript:;">Delete</a>
          </Popconfirm>
        )
      }
    ];
  };
 

  useEffect(() => {
    handleSearch(state.pageNum, state.pageSize);
  }, []);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
    handleSearch();
  };

  function handleChangePageParam(pageNum, pageSize) {
    setState({
      ...state,
      pageNum,
      pageSize
    });
    handleSearch();
  }

  const handleSearch = (v) => {
    const params = {
      keyword: v,
      type: state.type,
      pageNum: state.pageNum,
      pageSize: state.pageSize
    };
    new Promise(resolve => {
      dispatch({
        type: "otherUser/queryUser",
        payload: {
          resolve,
          params
        }
      });
    }).then(res => {
      // console.log('res :', res);
      if (res.code !== 0) {
        notification.error({
          message: res.message
        });
      }
    });
  };

  const handleDelete = (text, record) => {
    // console.log('text :', text);
    // console.log('record :', record);

    const params = {
      id: record._id
    };
    new Promise(resolve => {
      dispatch({
        type: "otherUser/delUser",
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

  const { pageNum, pageSize } = state;
  const pagination = {
    total,
    defaultCurrent: pageNum,
    pageSize,
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      // console.log('current, pageSize :', current, pageSize);
      handleChangePageParam(current, pageSize);
    },
    onChange: (current, pageSize) => {
      handleChangePageParam(current, pageSize);
    }
  };

  return (
    <PageHeaderWrapper title="用户管理">
      <Card bordered={false}>
        <Form layout="inline" style={{ marginBottom: "20px" }}>
       
            
              <Row
                gutter={{ md: 8, lg: 24, xl: 48 }}
                type="flex"
                justify="space-around"
                align="middle"
              >
                <Col span={24}>
                  <Search
                    style={{ textAlign: "center" }}
                    placeholder="用户名"
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
                <h4> 选择类型: </h4>
                <Col span={18}>
                  <Radio.Group 
                  name="type" 
                  onChange={e => handleChange(e)} 
                  value={state.type}>
                    <Radio value=''>所有</Radio>
                    <Radio value={1}>其他用户</Radio>
                    <Radio value={2}>管理员</Radio>
                  </Radio.Group>
                </Col>
              </Row>

         
        </Form>

        <Table
          pagination={pagination}
          loading={loading}
          pagination={pagination}
          rowKey={record => record._id}
          columns={columns()}
          bordered
          dataSource={userList}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ otherUser, loading }) => {
  const { userList, total } = otherUser;
  return {
    userList,
    total,
    loading: loading.models.otherUser
  };
})(Form.create()(TableList));
