import React, { useState, useEffect, memo, useCallback } from "react";
import { Input , Button, notification, Radio, Checkbox, Row, Col } from "antd";
import { routerRedux } from 'dva/router';
import SimpleMDE from "simplemde";
import marked from "marked";
import highlight from "highlight.js";
import "simplemde/dist/simplemde.min.css";
import { connect } from "dva";
import "./style.less";

const ArticleCreate = props => {
  const { dispatch, tagList, categoryList, articleDetail, loading } = props;

  const [state, setState] = useState({
    keywordCom: "",
    pageNum: 1,
    pageSize: 50,

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
  const [smde, setSmde] = useState(null);
  const [tags, setTages] = useState([]);
  const [category, setCategory] = useState([]);
  //   queryCategory
  useEffect(() => {
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
      // console.log('res :', res);
      if (res.code !== 0) {
        notification.error({
          message: res.message
        });
      }
    });
  }, []);
  //   queryTag
  useEffect(() => {
    const params = {
      keyword: state.keywordCom,
      pageNum: state.pageNum,
      pageSize: state.pageSize
    };

    dispatch({
      type: "tag/queryTag",
      payload: {
        params,
        resolve: res => {
          console.log("res :", res);
          if (res.code !== 0) {
            notification.error({
              message: res.message
            });
          }
        }
      }
    });
  }, []);
  useEffect(() => {
    setSmde(
      new SimpleMDE({
        element: document.getElementById("editor").childElementCount,
        autofocus: true,
        autosave: true,
        previewRender(plainText) {
          return marked(plainText, {
            renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight(code) {
              return highlight.highlightAuto(code).value;
            }
          });
        }
      })
    );
  }, []);

  const handleSubmit = () => {
    if (!state.title) {
      notification.error({
        message: "文章标题不能为空"
      });
      return;
    }
    if (!state.keyword) {
      notification.error({
        message: "文章关键字不能为空"
      });
      return;
    }
    if (!smde.value()) {
      notification.error({
        message: "文章内容不能为空"
      });
      return;
    }

    let keyword = state.keyword;
    if (keyword instanceof Array) {
      keyword = keyword.join(",");
    }
    const params = {
      title: state.title,
      author: state.author,
      desc: state.desc,
      keyword: state.keyword,
      content: smde.value(),
      img_url: state.img_url,
      origin: state.origin,
      state: state.state,
      type: state.type,
      tags,
      category
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
        
        dispatch(routerRedux.replace('/article/list'))
   
      } else {
        notification.error({
          message: res.message
        });
      }
    });
    setState({
      ...state,
      keywordCom: "",
      pageNum: 1,
      pageSize: 50,

      title: "",
      author: "wangtongxi",
      keyword: "",
      content: "",
      desc: "",
      img_url: "",
      origin: 0, // 0 原创，1 转载，2 混合
      state: 0, // 文章发布状态 => 0 草稿，1 已发布
      type: 1 // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
    });
    setTages([]);
    setCategory([]);
 
  };

  const InputInfo = [
    { message: "标题", name: "title", value: state.title },
    { message: "作者", name: "author", value: state.author },
    { message: "关键字", name: "keyword", value: state.keyword },
    { message: "描述", name: "desc", value: state.desc },
    { message: "封面链接", name: "img_url", value: state.img_url }
  ];

  function handleChangeTag(checkedValues) {
    console.log( "checkedValues",checkedValues,);
    setTages(checkedValues );
  }

  function handleChangeCategory(checkedValues) {
    console.log( "checkedValues",checkedValues,);
    setCategory(checkedValues );
  }
  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
    console.log(state[e.target.name], ":", e.target.value);
  };

  return (
    <div>
      {InputInfo.map(input => {
        return (
          <Input
            key={input.message}
            style={{ marginBottom: 20, textAlign: "center" }}
            addonBefore={input.message}
            size={input.size}
            placeholder={input.message}
            name={input.name}
            value={input.value}
            onChange={e => handleChange(e)}
          />
        );
      })}
      <Row gutter={[8, 16]}>
        <Col span={5}>选择发布状态</Col>
        <Col span={19}>
          <Radio.Group name="state" onChange={e => handleChange(e)} value={state.state}>
            <Radio value={0}>草稿</Radio>
            <Radio value={1}>发布</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col span={5}>选择文章类型</Col>
        <Col span={19}>
          <Radio.Group name="type" onChange={e => handleChange(e)} value={state.type}>
            <Radio value={1}>普通文章</Radio>
            <Radio value={2}>简历</Radio>
            <Radio value={3}>管理员介绍</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col span={5}>选择文章转载状态</Col>
        <Col span={19}>
          <Radio.Group name="origin" onChange={e => handleChange(e)} value={state.origin}>
            <Radio value={0}>原创</Radio>
            <Radio value={1}>转载</Radio>
            <Radio value={2}>混合</Radio>
          </Radio.Group>
        </Col>
      </Row>

      <Row gutter={[8, 16]}>
        <Col span={5}>选择文章标签</Col>
        <Col span={19}>
          <Checkbox.Group onChange={v => handleChangeTag(v)}>
            {tagList.map(item => (
              <Checkbox key={item._id} value={item._id}>
                {item.name}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Col>
      </Row>

      <Row gutter={[8, 16]}>
        <Col span={5}>选择文章分类</Col>
        <Col span={19}>
          <Checkbox.Group onChange={v => handleChangeCategory(v)}>
            {categoryList.map(item => (
              <Checkbox key={item._id} value={item._id}>
                {item.name}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Col>
      </Row>

      <div>
        <Button
          onClick={() => handleSubmit()}
          loading={loading}
          style={{ marginBottom: 10 }}
          type="primary"
        >
          {" "}
          提交
        </Button>
      </div>
      <div title="添加与修改文章" width="1200px">
        <textarea id="editor" style={{ marginBottom: 20, width: 800 }} size="large" rows={6} />
      </div>
    </div>
  );
};

export default connect(({ tag, category, article, loading }) => {
  return {
    tagList: tag.tagList,
    categoryList: category.categoryList,
    articleDetail: article.articleDetail,

    loading: loading.effects["article/updateArticle"]
  };
})(ArticleCreate);

// const ChilduseMemo = (props) => {
//   // console.log(`--- component re-render ---`);
//   return useMemo(() => {
//     console.log(`--- useMemo re-render ---`);
//     return <div>
//       {/* <p>step is : {props.step}</p> */}
//       {/* <p>count is : {props.count}</p> */}
//       <p>number is : {props.number}</p>
//     </div>
//   }, [props.number]);
// }
