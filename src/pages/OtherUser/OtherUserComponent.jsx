import React from "react";
import { Input, Modal } from "antd";

const OtherUserComponent = props => {
  const {
    handleCancel,
    name,
    handleChange,
    icon,
    handleIconChange,
    url,
    handleUrlChange,
    type,
    handleTypeChange,
    desc,
    handleDescChange
  } = props;

  const normalCenter = {
    textAlign: "center",
    marginBottom: 20
  };
  return (
    <div>
      <Modal
        title="添加链接"
        visible={visible}
        onOk={handleOk}
        width="600px"
        onCancel={handleCancel}
      >
        <Input
          style={normalCenter}
          addonBefore="链接名"
          size="large"
          placeholder="链接名"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <Input
          style={normalCenter}
          addonBefore="链接图标"
          size="large"
          placeholder="链接图标"
          name="icon"
          value={icon}
          onChange={handleIconChange}
        />
        <Input
          style={normalCenter}
          addonBefore="链接链接"
          size="large"
          placeholder="链接链接"
          name="url"
          value={url}
          onChange={handleUrlChange}
        />
        <Input
          style={normalCenter}
          addonBefore="链接类型"
          size="large"
          placeholder="1 :其他友情链接 2: 是博主的个人链接 "
          name="type"
          value={type}
          onChange={handleTypeChange}
        />
        <Input
          addonBefore="描述"
          size="large"
          placeholder="描述"
          name="desc"
          value={desc}
          onChange={handleDescChange}
        />
      </Modal>
    </div>
  );
};

export default OtherUserComponent;
