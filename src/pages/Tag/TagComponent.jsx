import React,{memo} from "react";
import { Input, Modal } from "antd";

const TagComponent = memo(props => {
  const { visible, handleOk, handleCancel, name, handleChange, desc, handleDescChange } = props;
  const normalCenter = {
    textAlign: "center",
    marginBottom: 20
  };
  return (
    <Modal title="添加标签" visible={visible} onOk={handleOk} width="600px" onCancel={handleCancel}>
      {console.log('child reload........')}
      <Input
        style={normalCenter}
        addonBefore="标签名"
        size="large"
        placeholder="标签名"
        name="title"
        value={name}
        onChange={handleChange}
      />
      <Input
      style={normalCenter}
        addonBefore="描述"
        size="large"
        placeholder="描述"
        name="title"
        value={desc}
        onChange={handleDescChange}
      />
    </Modal>
  );
}) 

export default TagComponent;

