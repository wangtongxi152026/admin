import React, { useState, useMemo, useEffect, useCallback } from "react";
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
  Switch,
  Tag,
  Select
} from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";

import CategoryComponent from "./CategoryComponent";

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */

const TableList = props => {
  const { dispatch, categoryList, total } = props;
  const [state, setState] = useState({
    visible: false,
    loading: false,
    keyword: "",
    pageNum: 1,
    pageSize: 10,
    name: "",
    desc: ""
  });

  const columns = () => {
    return useMemo(() => {
      return [
        {
          title: "分类名",
          dataIndex: "name"
        },
        {
          title: "描述",
          dataIndex: "desc"
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
    },[handleDelete,moment]);
  };

  useEffect(() => {
    handleSearch(state.pageNum, state.pageSize);
  }, []);

  const handleChange = event => {
    setState({
      ...state,
      name: event.target.value
    });
  };

  function handleDescChange(event) {
    setState({
      ...state,
      desc: event.target.value
    });
  }

  function handleChangeKeyword(event) {
    setState({
      ...state,
      keyword: event.target.value
    });
  }

  function handleChangePageParam(pageNum, pageSize) {
    setState({
      ...state,
      pageNum,
      pageSize
    });
    handleSearch();
  }

  const showModal = () => {
    setState({ ...state, visible: true });
  };

  const handleOk = () => {
    const params = {
      name: state.name,
      desc: state.desc
    };
    new Promise(resolve => {
      dispatch({
        type: "category/addCategory",
        payload: {
          resolve,
          params
        }
      });
    }).then(res => {
      console.log("addCategory res :", res);
      if (res.code === 0) {
        notification.success({
          message: res.message
        });
        setState({
          ...state,
          visible: false,
          name: "",
          desc: ""
        });
        handleSearch(state.pageNum, state.pageSize);
      } else {
        notification.error({
          message: res.message
        });
      }
    });
  };

  const handleCancel = useCallback (() => {
    setState({
      ...state,
      visible: false
    });
  },[]);

  const handleSearch =  () => {

    setState({ ...state, loading: true });
    const params = {
      keyword: state.keyword,
      pageNum: state.pageNum,
      pageSize: state.pageSize
    };
    new Promise(resolve => {
      dispatch({
        type: "category/queryCategory",
        payload: {
          resolve,
          params
        }
      });
    }).then(res => {
      console.log("res :", res);
      if (res.code === 0) {
        console.log(state, "state");
        setState({
          ...state,
          loading: false,
          visible:false
        });
        console.log(state, "state");
      } else {
        notification.error({
          message: res.message
        });
      }
    });
  };

  const handleDelete = (text, record) => {
    console.log("text :", text);
    console.log("record :", record);

    const params = {
      id: record._id
    };
    new Promise(resolve => {
      dispatch({
        type: "category/delCategory",
        payload: {
          resolve,
          params
        }
      });
    }).then(res => {
      console.log("res :", res);
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

  // const  renderSimpleForm =  () =>{
  //     return (
  //       <Form layout="inline" style={{ marginBottom: "20px" }}>
  //         <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
  //           <Col md={24} sm={24}>
  //             <FormItem>
  //               <Input
  //                 placeholder="分类名"
  //                 value={ state.keyword}
  //                 onChange={ handleChangeKeyword}
  //               />
  //             </FormItem>

  //             <span>
  //               <Button
  //                 onClick={ handleSearch}
  //                 style={{ marginTop: "3px" }}
  //                 type="primary"
  //                 icon="search"
  //               >
  //                 Search
  //               </Button>
  //             </span>
  //             <span>
  //               <Button
  //                 style={{ marginTop: "3px", marginLeft: "20px" }}
  //                 onClick={ showModal}
  //                 type="primary"
  //               >
  //                 新增
  //               </Button>
  //             </span>
  //           </Col>
  //         </Row>
  //       </Form>
  //     );
  //   }

  const pagination = () => {
    return {
      total,
      defaultCurrent: state.pageNum,
      pageSize: state.pageSize,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        console.log("current, pageSize :", current, pageSize);
        handleChangePageParam(current, pageSize);
      },
      onChange: (current, pageSize) => {
        handleChangePageParam(current, pageSize);
      }
    };
  };

  return (
    <PageHeaderWrapper title="分类管理">
      <Card bordered={false}>
        <div className="">
          <div className="">
          {console.log('father reload')}

            <Form layout="inline" style={{ marginBottom: "20px" }}>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={24} sm={24}>
                  <FormItem>
                    <Input
                      placeholder="分类名"
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
            pagination={pagination()}
            loading={state.loading}
            pagination={pagination}
            rowKey={record => record._id}
            columns={columns()}
            bordered
            dataSource={categoryList}
          />
        </div>
      </Card>
      <CategoryComponent
        name={state.name}
        desc={state.desc}
        visible={state.visible}
        showModal={showModal}
        handleChange={handleChange}
        handleDescChange={handleDescChange}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ category }) => {
  const { categoryList, total } = category;
  return {
    categoryList,
    total
  };
})(Form.create()(TableList));
