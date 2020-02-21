import React, { Fragment, useState, useEffect } from "react";
import { connect } from "dva";
import moment from "moment";
import { Row, Col, Card, Form, Input, Button, Table, notification, Popconfirm } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";

import TagComponent from "./TagComponent";

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */

const TableList = props => {
  const { tagList, total, dispatch } = props;
  const [state, setState] = useState({
 
    loading: false,
    keyword: "",
    pageNum: 1,
    pageSize: 10,
    name: "",
    desc: ""
  });  
  const [visible, setVisble] = useState(false);
  const columns = () => {
    return [
      {
        title: "标签名",
        dataIndex: "name"
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
          <Fragment>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(text, record)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </Fragment>
        )
      }
    ];
  };

  useEffect(() => {
    handleSearch(state.pageNum, state.pageSize);
  }, []);

  function handleChange(event) {
    console.log("event :", event);
    setState({
      ...state,
      name: event.target.value
    });
  }

  function handleDescChange(event) {
    // console.log('event :', event)
    setState({
      ...state,
      desc: event.target.value
    });
  }

  function handleChangeKeyword(event) {
    // console.log('event :', event)
    setState({
      ...state,
      keyword: event.target.value
    });
  }

  function handleChangePageParam(pageNum, pageSize) {
    setState({ ...state, pageNum, pageSize });
    handleSearch();
  }

  const showModal = () => {
    setVisble(true)
  };

  const handleOk = e => {
    const params = {
      name: state.name,
      desc: state.desc
    };
    new Promise(resolve => {
      dispatch({
        type: "tag/addTag",
        payload: {
          resolve,
          params
        }
      });
    }).then(res => {
      console.log('addTag res :', res);
      if (res.code === 0) {
        notification.success({
          message: res.message
        });
        setState({
          ...state,
  
          name: "",
          desc:'' });
setVisble(false)
        handleSearch(state.pageNum, state.pageSize);
      } else {
        notification.error({
          message: res.message
        });
      }
    });
  };

  const handleCancel = e => {
    setVisble(false)
  };

  const handleSearch = () => {
    setState({
      ...state,
      loading: true
    });
 
    const params = {
      keyword: state.keyword,
      pageNum: state.pageNum,
      pageSize: state.pageSize
    };
    new Promise(resolve => {
      dispatch({
        type: "tag/queryTag",
        payload: {
          resolve,
          params
        }
      });
    }).then(res => {
      // console.log('res :', res);
      if (res.code === 0) {
        setState({
          ...state,
          loading: false
        });
      } else {
        notification.error({
          message: res.message
        });
      }
    });
  };

  const handleDelete = (text, record) => {
    // console.log('text :', text);
    // console.log('record :', record);
    const { dispatch } = props;
    const params = {
      id: record._id
    };
    new Promise(resolve => {
      dispatch({
        type: "tag/delTag",
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

  const pagination = {
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

  return (
    <PageHeaderWrapper title="标签管理">
      <Card bordered={false}>
        <div className="">
          <div className="">
            <Form layout="inline" style={{ marginBottom: "20px" }}>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={24} sm={24}>
                  <FormItem>
                    <Input
                      placeholder="标签名"
                      value={state.keyword}
                      onChange={handleChangeKeyword}
                    />
                  </FormItem>

                  <span>
                    <Button
                      onClick={handleSearch}
                      style={{ marginTop: "3px" }}
                      type="primary"
                      icon="search"
                    >
                      Search
                    </Button>
                  </span>
                  <span>
                    <Button
                      style={{ marginTop: "3px", marginLeft: "20px" }}
                      onClick={showModal}
                      type="primary"
                    >
                      新增
                    </Button>
                  </span>
                </Col>
              </Row>
            </Form>
          </div>
          <Table
            pagination={pagination}
            loading={state.loading}
            pagination={pagination}
            rowKey={record => record._id}
            columns={columns()}
            bordered
            dataSource={tagList}
          />
        </div>
      </Card>
      <TagComponent
 
        name={state.name}
        desc={state.desc}
        visible={ visible}
        showModal={showModal}
        handleChange={handleChange}
        handleDescChange={handleDescChange}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ tag }) => {
  const { tagList, total } = tag;
  return {
    tagList,
    total
  };
})(Form.create()(TableList));
