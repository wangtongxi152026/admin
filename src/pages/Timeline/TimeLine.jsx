import React from "react";
import { Input, Modal, Select, DatePicker } from "antd";
import { connect } from "dva";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const TimeAxisComponent = props => {
  const {
    timeAxisDetail,
    changeType,
    title,
    content,
    state,
    visible,
    handleOk,
    handleChange,
    handleStateChange,
    handleChangeContent,
    handleCancel,
    onChangeTime
  } = props;

 

  const normalCenter = {
    textAlign: "center",
    marginBottom: 20
  };

  return (
    <div>
      <Modal
        title="添加与修改时间轴"
        visible={visible}
        onOk={handleOk}
        width="800px"
        onCancel={handleCancel}
      >
        <Input
          style={normalCenter}
          addonBefore="标题"
          size="large"
          placeholder="标题"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <TextArea
          style={normalCenter}
          size="large"
          placeholder="内容"
          name="content"
          value={content}
          onChange={handleChangeContent}
        />
        <RangePicker style={{ marginBottom: "20px", width: "100%" }} onChange={onChangeTime} />
        <Select
          style={{ marginBottom: "20px", width: "100%" }}
          placeholder="选择状态"
          defaultValue={state === 1 ? "已完成" : state === 2 ? "正在进行中" : "未完成"}
          onChange={handleStateChange}
        >
          {/* 状态 1 是已经完成 ，2 是正在进行，3 是没完成 */}
          <Select.Option value={1}>已完成</Select.Option>
          <Select.Option value={2}>正在进行中</Select.Option>
          <Select.Option value={3}>没完成</Select.Option>
        </Select>
      </Modal>
    </div>
  );
};

export default connect(({ timeAxis }) => {
  return {
    timeAxisDetail: timeAxis.timeAxisDetail
  };
})(TimeAxisComponent);
