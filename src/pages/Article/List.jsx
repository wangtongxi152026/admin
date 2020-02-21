/* eslint-disable */
import React, { useCallback, memo, Fragment, useState, useEffect, useMemo } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import moment from "moment";
import { connect } from "dva";
import { routerRedux } from 'dva/router';
import domain from "@/utils/domain.js";
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
  Avatar,
  Radio
} from "antd";

import ArticleComponent from "./ArticleComponent";
import CommentsComponent from "./CommentsComponent";

const { Search } = Input;

const List = props => {
  const { dispatch, articleDetail, articleList, total, loading } = props;

  const [state, setState] = useState({
    changeType: true,
    state: 1, // 文章发布状态 => 0 草稿，1 已发布
    type: 1, // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
    pageNum: 1,
    pageSize: 10,
    article_id: "",
    keyword: "",

    title: "",
    author: "wangtongxi",
    content: "",
    desc: "",
    img_url: "",

    origin: 0, // 0 原创，1 转载，2 混合
    state: 0, // 文章发布状态 => 0 草稿，1 已发布
    type: 1 // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
  });

  const [keyword, setKeyword] = useState("");

  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("wangtongxi");
  // const [content, setContent] = useState("");
  // const [img_url, setImg_url] = useState("");
  // const [desc, setDesc] = useState("");

  const [origin, setOrigin] = useState(0); // 0 原创，1 转载，2 混合
  const [visible, setVisible] = useState(false);
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [tagsDefault, setTagsDefault] = useState([]);

  const [categoryDefault, setCategoryDefault] = useState([]);

  const [commentsVisible, setCommentsVisible] = useState(false); // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章

  const [searchState, setsearchState] = useState(""); // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章

  useEffect(() => {
    handleSearch("");
  }, []);

  const handleSearch = useCallback(
    v => {
      console.log(v, "handleSearch");
      const params = {
        keyword: v,
        state: searchState,
        pageNum: state.pageNum,
        pageSize: state.pageSize
      };
      console.log(params, "params");
      new Promise(resolve => {
        dispatch({
          type: "article/queryArticle",
          payload: {
            resolve,
            params
          }
        });
      }).then(res => {
        if (res.code !== 0) {
          notification.error({
            message: res.message
          });
        }
      });
    },
    [searchState, state.pageNum, state.pageSize]
  );

  const handleSubmit = () => {
    if (!title) {
      notification.error({
        message: "文章标题不能为空"
      });
      return;
    }
    if (!keyword) {
      notification.error({
        message: "文章关键字不能为空"
      });
      return;
    }
    if (!content) {
      notification.error({
        message: "文章内容不能为空"
      });
      return;
    }
    if (keyword instanceof Array) {
      keyword = keyword.join(",");
    }

    let keyword = keyword;
    if (keyword instanceof Array) {
      keyword = keyword.join(",");
    }

    if (state.changeType) {
      const params = {
        id: articleDetail._id,
        title: title,
        author: author,
        desc: desc,
        keyword,
        content: content,
        img_url: img_url,
        origin: origin,
        state: state.state,
        type: state.type,
        tags,
        category
      };
      new Promise(resolve => {
        dispatch({
          type: "article/updateArticle",
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
          setVisible(false);
          setTags("");
          setCategory("");
          setTagsDefault([]);
          setCategoryDefault([]);

          setState({
            ...state,
            changeType: false,
            title: "",
            author: "wangtongxi",
            keyword: "",
            content: "",
            desc: "",
            img_url: "",
            origin: 0, // 0 原创，1 转载，2 混合
            state: 1, // 文章发布状态 => 0 草稿，1 已发布
            type: 1 // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
          });

          handleSearch(state.pageNum, state.pageSize);
        } else {
          notification.error({
            message: res.message
          });
        }
      });
    } else {
      const params = {
        title: title,
        author: author,
        desc: desc,
        keyword: keyword,
        content: content,
        img_url: img_url,
        origin: origin,
        state: state.state,
        type: state.type,
        tags: tags,
        category: category
      };
      new Promise(resolve => {
        dispatch({
          type: "article/addArticle",
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
          changeTypesetState({
            changeType: false
          });
          setVisible(false);
          changeTypehandleSearch(state.pageNum, state.pageSize);
        } else {
          notification.error({
            message: res.message
          });
        }
      });
    }
  };

  const handleCategoryChange = value => {
    const category = value.join();
    console.log("category :", category);
    setCategoryDefault(value);
    setCategory(category);
  };

  const handleTagChange = value => {
    const tags = value.join();
    console.log("tags :", tags);
    setTagsDefault(value);
    setTags(tags);
  };

  const handleChangeType = value => {
    console.log("type :", value);
    changeTypesetState({
      ...state,
      type: value
    });
  };

  const handleChangeSearchState = e => {
    setsearchState(e.target.value);
    // handleSearch();
  };

  const handleChangePageParam = (pageNum, pageSize) => {
    setState({ ...state, pageNum, pageSize });

    handleSearch();
  };

  const showModal = record => {
    // getArticleDetail(router.push(`/article/update/${record._id}`));
    
    dispatch(routerRedux.push(`/article/update?id=${record._id}&type=${record.type}`))
 
  }

  const pagination = {
    total,
    defaultCurrent: state.pageNum,
    pageSize: state.pageSize,
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      handleChangePageParam(current, pageSize);
    },
    onChange: (current, pageSize) => {
      handleChangePageParam(current, pageSize);
    }
  };
  const columns = () => [
    {
      title: "标题",
      width: 120,
      dataIndex: "title"
    },
    {
      title: "作者",
      width: 80,
      dataIndex: "author"
    },
    {
      title: "关键字",
      width: 80,
      dataIndex: "keyword",

      render: arr => (
        <div>
          {arr.map(item => (
            <div color="magenta" key={item}>
              {item}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "封面图",
      width: 100,
      dataIndex: "img_url",
      render: val => <Avatar shape="square" src={val} size={100} icon="user" />
    },
    {
      title: "标签",
      dataIndex: "tags",
      width: 60,

      render: arr => (
        <div>
          {arr.map(item => (
            <Tag color="cyan" key={item.id}>
              {item.name}
            </Tag>
          ))}
        </div>
      )
    },
    {
      title: "分类",
      dataIndex: "category",
      width: 70,

      render: arr => (
        <div>
          {arr.map(item => (
            <Tag color="blue" key={item.id}>
              {item.name}
            </Tag>
          ))}
        </div>
      )
    },
    {
      title: "状态",
      dataIndex: "state",
      width: 70,
      render: val => {
        // 文章发布状态 => 0 草稿，1 已发布
        if (val === 0) {
          return <Tag color="red">草稿</Tag>;
        }
        if (val === 1) {
          return <Tag color="green">已发布</Tag>;
        }
      }
    },
    {
      title: "评论是否处理过",
      dataIndex: "comments",
      width: 50,
      // eslint-disable-next-line react/display-name
      render: comments => {
        // console.log('comments',comments)
        let flag = 1;
        let length = comments.length;
        if (length) {
          for (let i = 0; i < length; i++) {
            flag = comments[i].is_handle;
          }
        }
        // 新添加的评论 是否已经处理过 => 1 是 / 2 否
        if (flag === 2) {
          return <Tag color="red">否</Tag>;
        }
        return <Tag color="green">是</Tag>;
      }
    },
    {
      title: "观看|点赞|评论",
      width: 135,
      dataIndex: "meta",
      // eslint-disable-next-line react/display-name
      render: val => (
        <div>
          <span>{val.views}</span> | <span>{val.likes}</span> | <span>{val.comments}</span>
        </div>
      )
    },
    {
      title: "原创状态",
      dataIndex: "origin",
      width: 50,
      // eslint-disable-next-line react/display-name
      render: val => {
        // 文章转载状态 => 0 原创，1 转载，2 混合
        if (val === 0) {
          return <Tag color="green">原创</Tag>;
        }
        if (val === 1) {
          return <Tag color="red">转载</Tag>;
        }
        return <Tag>混合</Tag>;
      }
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      sorter: true,
      // eslint-disable-next-line react/display-name
      render: val => <div>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</div>
    },
    {
      title: "操作",
      width: 220,
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <>
          <Fragment>
            <a onClick={() => showModal(record)}>修改</a>
          </Fragment>
          <Divider type="vertical" />
          <Fragment>
            <a onClick={() => showCommentModal(record)}>评论</a>
          </Fragment>
          <Divider type="vertical" />
          <Fragment>
            <a href={`${domain}articleDetail?article_id=${record._id}`} target="_blank">
              详情
            </a>
          </Fragment>
          <Divider type="vertical" />
          <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(text, record)}>
            <a href="javascript:;">删除</a>
          </Popconfirm>
        </>
      )
    }
  ];
  const handleDelete = (text, record) => {
    // console.log('text :', text);
    // console.log('record :', record);

    const params = {
      id: record._id
    };
    new Promise(resolve => {
      dispatch({
        type: "article/delArticle",
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
  const showCommentModal = record => {
    if (!record._id) {
      return;
    }
    setState({ ...state, article_id: record._id });
    getArticleDetail(setCommentsVisible(true));
  };

  // 文章详情获取
  const getArticleDetail = callback => {
    const params = {
      id: state.article_id,
      filter: 2 // 文章的评论过滤 => 1: 过滤，2: 不过滤
    };
    new Promise(resolve => {
      dispatch({
        type: "article/getArticleDetail",
        payload: {
          resolve,
          params
        }
      });
    }).then(res => {
      if (res.code === 0) {
        !!callback && callback();
      }
    });
  };

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <Form style={{ marginBottom: 20 + "px" }}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="space-around" align="middle">
            <Col span={24}>
              <Search
                style={{ textAlign: "center" }}
                placeholder="标题/描述"
                enterButton
                size="large"
                loading={loading}
                onSearch={value => handleSearch(value)}
              />
            </Col>
          </Row>

          <Row
            gutter={[8, 30]}
            style={{ fontSize: 15 }}
            type="flex"
            justify="space-around"
            align="middle"
          >
            <h4> 选择文章状态: </h4>
            <Col span={18}>
              <Radio.Group
                name="state"
                onChange={e => handleChangeSearchState(e)}
                value={searchState}
              >
                <Radio value={""}>所有</Radio>
                <Radio value={0}>草稿</Radio>
                <Radio value={1}>已发布</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Form>

        <div>
          <Button
            style={{ marginBottom: 10 }}
            onClick={() =>dispatch(routerRedux.push(`/article/create`))}
            type="primary"
          >
            新增
          </Button>
        </div>
        {/* <div>
            <Button style={{ marginBottom: 10 }} onClick={() => showModal(0)} type="primary">
              新增
            </Button>
          </div> */}
        <Table
          size="middle"
          loading={loading}
          pagination={pagination}
          rowKey={record => record._id}
          columns={columns()}
          bordered
          dataSource={articleList}
        ></Table>
      </Card>

      <CommentsComponent
        commentsVisible={commentsVisible}
        handleCommentsCancel={setCommentsVisible}
        article_id={state.article_id}
      />

      {/* <ArticleComponent
        visible={visible}
        changeType={state.changeType}
        title={title}
        author={author}
        content={content}
        desc={desc}
        img_url={img_url}
        keyword={keyword}
        origin={origin}
        state={state.state}
        type={state.type}
        tagsDefault={tagsDefault}
        categoryDefault={categoryDefault}
        handleOk={handleSubmit}
        handleCancel={setVisible}
        handleChangeState={setState}
        handleChange={setTitle}
        handleChangeAuthor={setAuthor}
        handleChangeContent={setContent}
        handleChangeKeyword={setKeyword}
        handleChangeDesc={setDesc}
        handleChangeImgUrl={setImg_url}
        handleChangeOrigin={setOrigin}
        handleCategoryChange={handleCategoryChange}
        handleTagChange={handleTagChange}
        handleChangeType={handleChangeType}
      /> */}
    </PageHeaderWrapper>
  );
};

export default connect(({ article, loading }) => {
  const { total, articleDetail, articleList } = article;
  return {
    articleDetail,
    total,
    articleList,
    loading: loading.effects["article/queryArticle"]
  };
})(Form.create()(List));
