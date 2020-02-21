import React, { useState, useEffect, memo, useCallback, useMemo, useLayoutEffect } from "react";
import { Input, Button, notification, Radio, Checkbox, Row, Col } from "antd";
import router from "umi/router";
import SimpleMDE from "simplemde";
import marked from "marked";
import highlight from "highlight.js";
import "simplemde/dist/simplemde.min.css";
import { connect } from "dva";
import "./style.less";
const { TextArea } = Input;

const ArticleUpdate = props => {
  const { dispatch, tagList, categoryList, articleDetail, loading } = props;

  const [state, setState] = useState({
    keywordCom: "",
    pageNum: 1,
    pageSize: 50,
    title: articleDetail.title,
    author: articleDetail.author,
    keyword: articleDetail.keyword,
    desc: articleDetail.desc,
    img_url: articleDetail.img_url,
    origin: articleDetail.origin, // 0 原创，1 转载，2 混合
    state: articleDetail.state, // 文章发布状态 => 0 草稿，1 已发布
    type: articleDetail.type, // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍

    content: articleDetail.content
  });

  const [smde, setSmde] = useState(null);
  const [tags, setTages] = useState(null);
  const [category, setCategory] = useState(null);

  // useEffect(() => {
  //   const { id } = match.params;
  //   const params = {
  //     id: id,
  //     filter: 2 // 文章的评论过滤 => 1: 过滤，2: 不过滤
  //   };
  //   dispatch({
  //     type: "article/getArticleDetail",
  //     payload: {
  //
  //       params
  //     }
  //   });
  // }, []);

 



  useEffect(() => {
    let categoryArr = [];
    let tagsArr = [];
    if (articleDetail.category.length) {
      for (let i = 0; i < articleDetail.category.length; i++) {
        const e = articleDetail.category[i];
        categoryArr.push(e._id);
      }
      console.log(articleDetail.tags, articleDetail.category);
      setTages(tagsArr);
    }

    if (articleDetail.tags.length) {
      for (let i = 0; i < articleDetail.tags.length; i++) {
        const e = articleDetail.tags[i];
        tagsArr.push(e._id);
      }
      console.log(articleDetail.tags, articleDetail.category);
      setCategory(categoryArr);
    }
  }, []);

  useEffect(() => {
    const params = {
      keyword: state.keywordCom,
      pageNum: state.pageNum,
      pageSize: state.pageSize
    };
    dispatch({
      type: "category/queryCategory",
      payload: {
        resolve: res => {
          console.log("res :", res);
          if (res.code !== 0) {
            notification.error({
              message: res.message
            });
          }
        },
        params
      }
    });
  }, []);

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
     console.log('props.location.query.id',props.location.query.id);
    const params = {
      id: props.location.query.id,
      title: state.title,
      author: state.author,
      desc: state.desc,
      keyword: state.keyword,
      content: smde.value(),
      img_url: state.img_url,
      origin: state.origin,
      state: state.state,
      type: state.type,
      tags: tags,
      category: category
    };
    // 修改
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
        router.replace(`/article/list`);
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
      } else {
        notification.error({
          message: res.message
        });
      }
    });
  };
  console.log("99999999999");
  const InputInfo = useMemo(() => {
    return [
      { message: "标题", name: "title", value: state.title },
      { message: "作者", name: "author", value: state.author },
      { message: "关键字", name: "keyword", value: state.keyword },
      { message: "描述", name: "desc", value: state.desc },
      { message: "封面链接", name: "img_url", value: state.img_url }
    ];
  }, [state.title, state.author, state.keyword, state.desc, state.img_url]);

  const RadioInfo = useMemo(
    () => [
      {
        type: "选择发布状态",
        name: "state",
        value: state.state,
        Radio: [
          { value: 0, info: "草稿" },
          { value: 1, info: "发布" }
        ]
      },
      {
        type: "选择文章类型",
        name: "type",
        value: state.type,
        Radio: [
          { value: 1, info: "普通文章" },
          { value: 2, info: "简历" },
          { value: 3, info: "管理员介绍" }
        ]
      },
      {
        type: "选择文章转载状态",
        name: "origin",
        value: state.origin,
        Radio: [
          { value: 0, info: "原创" },
          { value: 1, info: "转载" },
          { value: 2, info: "混合" }
        ]
      }
    ],
    [state.state, state.type, state.origin]
  );
  function handleChangeTag(checkedValues) {
    console.log(checkedValues, "checkedValues");
    setTages(checkedValues);
  }

  function handleChangeCategory(checkedValues) {
    console.log(checkedValues, "checkedValues");
    setCategory(checkedValues);
  }

  const handleChange = e => {
    console.log(e.target.name, e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
    console.log(state[e.target.name]);
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

      {RadioInfo.map(item => {
        return (
          <Row key={item.type} gutter={[8, 16]}>
            <Col span={5}>{item.type}</Col>
            <Col span={19}>
              <Radio.Group name={item.name} onChange={e => handleChange(e)} value={item.value}>
                {item.Radio.map(ele => (
                  <Radio key={ele.info} value={ele.value}>
                    {ele.info}
                  </Radio>
                ))}
              </Radio.Group>
            </Col>
          </Row>
        );
      })}
      <Row gutter={[8, 16]}>
        <Col span={5}>选择文章标签</Col>
        <Col span={19}>
          <Checkbox.Group onChange={v => handleChangeTag(v)} value={tags}>
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
          <Checkbox.Group onChange={v => handleChangeCategory(v)} value={category}>
            {console.log("category的渲染列表：", category)}
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
        <TextArea
          name="content"
          value={state.content}
          onChange={e => handleChange(e)}
          id="editor"
          style={{ marginBottom: 20, width: 800 }}
          size="large"
          rows={6}
        />
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
})(ArticleUpdate);

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
