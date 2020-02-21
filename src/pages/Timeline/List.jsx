import React, { Fragment, useEffect, memo, useState } from "react";
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
import { PageHeaderWrapper } from "@ant-design/pro-layout";

import TimeAxisComponent from "./TimeLine";

const { Search } = Input;

/* eslint react/no-multi-comp:0 */

const TableList = props => {
  const { dispatch, total, timeAxisList, timeAxisDetail, loading } = props;
  const [state, setState] = useState({
    changeType: false,
    title: "",
    stateComponent: "",
    content: "",
    start_time: new Date(),
    end_time: new Date(),

    keyword: "",
    state: "", // 状态 1 是已经完成 ，2 是正在进行，3 是没完成 ,'' 代表所有时间轴
    pageNum: 1,
    pageSize: 10
  });
  const [visible, setVisble] = useState(false);
  const columns = () => [
    {
      title: "标题",
      width: 150,
      dataIndex: "title"
    },
    {
      title: "内容",
      width: 350,
      dataIndex: "content"
    },
    {
      title: "状态",
      dataIndex: "state", // 状态 1 是已经完成 ，2 是正在进行，3 是没完成
      render: val => {
        // 状态 1 是已经完成 ，2 是正在进行，3 是没完成
        if (val === 1) {
          return <Tag color="green">已经完成</Tag>;
        }
        if (val === 2) {
          return <Tag color="red">正在进行</Tag>;
        }
        return <Tag>没完成</Tag>;
      }
    },
    {
      title: "开始时间",
      dataIndex: "start_time",
      sorter: true,
      render: val => <span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>
    },
    {
      title: "结束时间",
      dataIndex: "end_time",
      sorter: true,
      render: val => <span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>
    },
    {
      title: "操作",
      width: 150,
      render: (text, record) => (
        <div>
          <Fragment>
            <a onClick={() => showModal(record)}>修改</a>
          </Fragment>
          <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(text, record)}>
            <a href="javascript:;">删除</a>
          </Popconfirm>
        </div>
      )
    }
  ];

  // handleChangeKeyword = handleChangeKeyword.bind(this);
  // handleOk = handleOk.bind(this);
  // handleDelete = handleDelete.bind(this);
  // showModal = showModal.bind(this);
  // handleCancel = handleCancel.bind(this);
  // handleSearch = handleSearch.bind(this);
  // handleChangeState = handleChangeState.bind(this);
  // handleChange = handleChange.bind(this);
  // handleChangeContent = handleChangeContent.bind(this);
  // handleSubmit = handleSubmit.bind(this);
  // handleStateChange = handleStateChange.bind(this);
  // onChangeTime = onChangeTime.bind(this);

  useEffect(() => {
    handleSearch(state.pageNum, state.pageSize);
  }, []);

  const onChangeTime = (date, dateString) => {
    console.log(date, dateString);
    setState({
      ...state,
      start_time: new Date(dateString[0]),
      end_time: new Date(dateString[1])
    });
  };

  function handleSubmit() {
    if (state.changeType) {
      const params = {
        id: timeAxisDetail._id,
        state: state.stateComponent,
        title: state.title,
        content: state.content,
        start_time: state.start_time,
        end_time: state.end_time
      };
      new Promise(resolve => {
        dispatch({
          type: "timeAxis/updateTimeAxis",
          payload: {
            resolve,
            params
          }
        });
      }).then(res => {
        console.log("updateTimeAxis", res);
        if (res.code === 0) {
          notification.success({
            message: res.message
          });
          setState({
            ...state,

            changeType: false
          });
          setVisble(false);
          handleSearch(state.pageNum, state.pageSize);
        } else {
          notification.error({
            message: res.message
          });
        }
      });
    } else {
      const params = {
        state: state.stateComponent,
        title: state.title,
        content: state.content,
        start_time: state.start_time,
        end_time: state.end_time
      };
      new Promise(resolve => {
        dispatch({
          type: "timeAxis/addTimeAxis",
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
          setState({
            ...state,

            changeType: false
          });
          setVisble(false);
          handleSearch(state.pageNum, state.pageSize);
        } else {
          notification.error({
            message: res.message
          });
        }
      });
    }
  }

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeContent = event => {
    setState({
      ...state,
      content: event.target.value
    });
  };

  const handleStateChange = value => {
    setState({
      ...state,
      stateComponent: value
    });
  };

  function handleChangePageParam(pageNum, pageSize) {
    setState({ ...state, pageNum, pageSize });
    handleSearch();
  }

  const showModal = record => {
    if (record._id) {
      const params = {
        id: record._id
      };
      new Promise(resolve => {
        dispatch({
          type: "timeAxis/getTimeAxisDetail",
          payload: {
            resolve,
            params
          }
        });
      }).then(res => {
        if (res.code === 0) {
          setState({
            ...state,
            changeType: true,
            stateComponent: res.data.state,
            title: res.data.title,
            content: res.data.content
          });
          setVisble(true);
        } else {
          notification.error({
            message: res.message
          });
        }
      });
    } else {
      setState({
        ...state,
        changeType: false,
        stateComponent: "",
        title: "",
        content: ""
      });
      setVisble(true);
    }
  };

  const handleOk = () => {
    handleSubmit();
  };

  const handleCancel = () => {
    setVisble(false);
  };

  const handleSearch = (v) => {
    const params = {
      keyword:v,
      state: state.state,
      pageNum: state.pageNum,
      pageSize: state.pageSize
    };
    new Promise(resolve => {
      dispatch({
        type: "timeAxis/queryTimeAxis",
        payload: {
          resolve,
          params
        }
      });
    }).then(res => {
      console.log("res :", res);
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
        type: "timeAxis/delTimeAxis",
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
    <PageHeaderWrapper title="时间轴管理">
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

          <Row style={{ fontSize: 15 }} type="flex" justify="space-around" align="middle">
            <h4> 选择状态: </h4>
            <Col span={18}>
              <Radio.Group name="state" onChange={e => handleChange(e)} value={state.state}>
                <Radio value="">所有</Radio>
                <Radio value={1}>已完成</Radio>
                <Radio value={2}>正在进行</Radio>
                <Radio value={3}>未完成</Radio>
                {/* 状态 1 是已经完成 ，2 是正在进行，3 是没完成 ,'' 代表所有时间轴 */}
              </Radio.Group>
            </Col>
          </Row>

          <span>
            <Button
              onClick={showModal}
              style={{ marginTop: "3px", marginLeft: "10px" }}
              type="primary"
            >
              新增
            </Button>
          </span>
        </Form>

        <Table
          pagination={pagination}
          loading={loading}
          pagination={pagination}
          rowKey={record => record._id}
          columns={columns()}
          bordered
          dataSource={timeAxisList}
        />
      </Card>
      <TimeAxisComponent
        changeType={state.changeType}
        title={state.title}
        content={state.content}
        state={state.stateComponent}
        visible={visible}
        handleOk={handleOk}
        handleChange={handleChange}
        handleStateChange={handleStateChange}
        handleChangeContent={handleChangeContent}
        handleCancel={handleCancel}
        onChangeTime={onChangeTime}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ timeAxis, loading }) => {
  return {
    total: timeAxis.total,
    timeAxisList: timeAxis.timeAxisList,
    timeAxisDetail: timeAxis.timeAxisDetail,
    loading: loading.models.timeAxis
  };
})(Form.create()(TableList));

