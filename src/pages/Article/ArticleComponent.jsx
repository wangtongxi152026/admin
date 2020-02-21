import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { Input, Modal, Select, notification } from 'antd';
import { connect } from 'dva';
import './index.less';
 
const { TextArea } = Input;
const ArticleComponent = props => {
  const { 
    dispatch, articleDetail,visible, tagList, categoryList, changeType, handleOk, handleCancel,
    title,
    handleChange,
    author,
    handleChangeAuthor,
    keyword,
    handleChangeKeyword,
    desc,
    handleChangeDesc,
    img_url,
    handleChangeImgUrl, } = props;

 
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [keywordCom, setkeywordCom] = useState('');

  useEffect(() => {
   
    const params = { keyword: keywordCom, pageNum, pageSize };
    new Promise(resolve => {
      dispatch({
        type: 'tag/queryTag',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      console.log('res :', res);
      if (res.code !== 0) {
         notification.error({
          message: res.message,
        });
      } 
    });
  }, []);

  useEffect(() => {
 
    const params = { keyword: keywordCom, pageNum, pageSize };
    new Promise(resolve => {
      dispatch({
        type: 'category/queryCategory',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      // console.log('res :', res);
      if (res.code !== 0) {
        notification.error({
          message: res.message,
        });
      }  
    });
  }, []);

 
  const inputInfo =  
      [
      {
        message: '标题',
        name: 'title',

        size: 'large',
        value: title,
        handle: handleChange,
      },
      {
        message: '作者',
        name: 'author',

        size: 'large',
        value: author,
        handle: handleChangeAuthor,
      },
      {
        message: '关键字',
        name: 'keyword',

        size: 'large',
        value: keyword,
        handle: handleChangeKeyword,
      },
      {
        message: '描述',
        name: 'desc',

        size: 'large',
        value: desc,
        handle: handleChangeDesc,
      },
      {
        message: '封面链接',
        name: 'img_url',

        size: 'large',
        value: img_url,
        handle: handleChangeImgUrl,
      }
    ]

  


  // const func = (changeType) => {
    let originDefault = '原创';
    let stateDefault = '发布'; // 文章发布状态 => 0 草稿，1 发布
    let typeDefault = '普通文章'; // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
    let categoryDefault = [];
    let tagsDefault = [];
 

  return (
    <Modal
      width="1200px"
      title="添加与修改文章"
      visible={visible}
      onOk={() => handleOk()}
      onCancel={() => handleCancel()}
    >
      

      {inputInfo.map(input => {
        return (
          <Input
            key={input.message}
            className='normalCenter'
 
            addonBefore={input.message}
            size={input.size}
            placeholder={input.message}
            name={input.name}
            value={input.value}
            onChange={input.handle}
          />
        );
      })}

      <Select
 
        className='select'
        placeholder="选择发布状态"
        // defaultValue={stateDefault}
        onChange={props.handleChangeState}
      >
        {/*  0 草稿，1 发布 */}
        <Select.Option value="0">草稿</Select.Option>
        <Select.Option value="1">发布</Select.Option>
      </Select>

      <Select
        className='select'
        placeholder="选择文章类型"
        // defaultValue={typeDefault}
        onChange={props.handleChangeType}
      >
        {/* 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍 */}
        <Select.Option value="1">普通文章</Select.Option>
        <Select.Option value="2">简历</Select.Option>
        <Select.Option value="3">管理员介绍</Select.Option>
      </Select>

      <Select
         className='select2'
        placeholder="选择文章转载状态"
        // defaultValue={originDefault}
        onChange={props.handleChangeOrigin}
      >
        {/* 0 原创，1 转载，2 混合 */}
        <Select.Option value="0">原创</Select.Option>
        <Select.Option value="1">转载</Select.Option>
        <Select.Option value="2">混合</Select.Option>
      </Select>

      <Select
        allowClear
        mode="multiple"
        className='select2'
        placeholder="标签"
        // defaultValue={tagsDefault}
        value={props.tagsDefault}
        onChange={props.handleTagChange}
      >
        {tagList.map(item => (
          <Children key={item._id} item={item} />
        ))}
      </Select>
      <Select
        allowClear
        mode="multiple"
        className='select2'
 
        placeholder="文章分类"
        // defaultValue={categoryDefault}
        value={props.categoryDefault}
        onChange={props.handleCategoryChange}
      >
        {categoryList.map(item => (
          <Children key={item._id} item={item} />
        ))}
      </Select>

      <TextArea
        style={{ marginBottom: 20 }}
        size="large"
        rows={6}
        autosize={{ minRows: 15 }}
        placeholder="文章内容，支持 markdown 格式"
        name="content"
        value={props.content}
        onChange={props.handleChangeContent}
      />
    </Modal>
  );
};

export default connect(({ article, tag, category }) => ({
  tagList: tag.tagList,
  articleDetail: article.articleDetail,
  categoryList: category.categoryList,
}))(ArticleComponent);



const Children = ({ item }) => {
  return useMemo(() => {
    return <Select.Option value={item._id}>{item.name}</Select.Option>;
  }, [item])
}
 