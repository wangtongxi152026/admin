import React, { useCallback, memo, useMemo } from "react";
import { Input, Modal, Select, notification, Comment, Avatar, Tag } from "antd";
import { connect } from "dva";
import style from "./index.less";
  const normalCenter = {
    textAlign: "center",
    marginBottom: 20
  };
const CommentsComponent = props => {
  const {
    dispatch,
    getArticleDetail,
    articleDetail,
    commentsVisible,
    handleCommentsCancel
  } = props;

  const comp = () => {
    (articleDetail && articleDetail.comments)? (
      <CommentRender  dispatch={dispatch} getArticleDetail={getArticleDetail} comments={articleDetail.comments} />
    ) : (
      <div style={ normalCenter}>暂无评论！</div>
    );
  };
  return (
    <Modal
      title="文章评论管理"
      visible={commentsVisible}
      onOk={() => handleCommentsCancel(false)}
      width="1200px"
      onCancel={() => handleCommentsCancel(false)}
    > 

      <div>{comp()}</div>
    </Modal>
  );
};

const CommentRender = ({ comments, getArticleDetail, dispatch }) => {
 

  const handleChangeState = (value, type, index, item) => {
    // console.log('value', value)
    // console.log('type', type)
    // console.log('index', index)
    // console.log('item', item)
 
    // const params = { keyword: keywordCom, pageNum, pageSize };

    if (type === 1) {
      const params = {
        id: item._id,
        state: parseInt(value)
      };
      new Promise(resolve => {
        dispatch({
          type: "article/changeComment",
          payload: {
            resolve,
            params
          }
        });
      }).then(res => {
        console.log("res :", res);
        if (res.code === 0) {
     
          getArticleDetail();
          notification.success({
            message: res.message
          });
        } else {
          notification.error({
            message: res.message
          });
        }
      });
    } else {
      const params = {
        id: item._id,
        state: parseInt(value),
        index
      };
      new Promise(resolve => {
        dispatch({
          type: "article/changeThirdComment",
          payload: {
            resolve,
            params
          }
        });
      }).then(res => {
        // console.log('res :', res);
        if (res.code === 0) {
        

          getArticleDetail();
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
  };

  const actions = <Actions item={item} idx={idx} handleChangeState={handleChangeState} />;

  return comments.map(comment => {
    return <ExampleComment key={comment._id} comment={comment} actions={[actions]} />;
  });
};

const Actions = memo(({ item, idx, handleChangeState }) => {
  const getDefaultValue = useMemo(() => {
    let defaultValue = "";
    switch (state) {
      case 0:
        defaultValue = "待审核";
        break;
      case 1:
        defaultValue = "正常通过";
        break;
      case -1:
        defaultValue = "删除";
        break;
      case -2:
        defaultValue = "垃圾评论";
        break;

      default:
        break;
    }
    return defaultValue;
  }, [state]);

  return (
    <div>
      {item.is_handle === 2 ? <Tag color="red">未处理过</Tag> : <Tag color="green">已经处理过</Tag>}
      <Select
        style={style.selectComment}
        placeholder="选择审核状态"
        defaultValue={() => getDefaultValue(item.state)}
        onChange={value => handleChangeState(value, 2, idx, item)}
      >
        {/* 状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论 */}
        <Select.Option value="0">待审核</Select.Option>
        <Select.Option value="1">通过</Select.Option>
        <Select.Option value="-1">删除</Select.Option>
        <Select.Option value="-2">垃圾评论</Select.Option>
      </Select>
    </div>
  );
});

const ExampleComment = ({ comment, actions }) => {
  const children = ({ comment }) => {
    return useMemo(() => {
      if (comment.other_comments && comment.other_comments.length > 0) {
        const item = comment.other_comments;
        return <ExampleComment key={item._id} comment={item} actions={[actions]} />;
      } else {
        return null;
      }
    }, [comment]);
  };

  return (
    <Comment
      actions={actions}
      author={<a>{comment.user.name}</a>}
      avatar={<Avatar src={comment.user.avatar} alt={comment.user.name} />}
      content={
        <p>
          {" "}
          {comment.to_user ? "@" + comment.to_user.name + ":  " : ""} {comment.content}
        </p>
      }
    >
      {children()}
    </Comment>
  );
};

export default connect(({ article }) => {
  return {
    articleDetail: article.articleDetail ,
  };
})(CommentsComponent);
