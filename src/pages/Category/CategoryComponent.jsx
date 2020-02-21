import React, { memo,useMemo } from "react";
import { Input, Modal } from "antd";

// const LinkComponent = memo(props => {
//   const { visible, name, desc, handleOk, handleCancel, handleChange, handleDescChange } = props;
//   const normalCenter = {
//     textAlign: "center",
//     marginBottom: 20
//   };

//   return (
//     <div>
//       {console.log(".......child re load.................")}

//       <Modal
//         title="添加分类"
//         visible={visible}
//         onOk={handleOk}
//         width="600px"
//         onCancel={handleCancel}
//       >
//         <Input
//           style={normalCenter}
//           addonBefore="分类名"
//           size="large"
//           placeholder="分类名"
//           name="name"
//           value={name}
//           onChange={handleChange}
//         />
//         <Input
//           addonBefore="描述"
//           size="large"
//           placeholder="描述"
//           name="desc"
//           value={desc}
//           onChange={handleDescChange}
//         />
//       </Modal>
//     </div>
//   );
// });



const LinkComponent = memo( props => {
  const { visible, name, desc, handleOk, handleCancel, handleChange, handleDescChange } = props;
 

  const normalCenter = {
    textAlign: "center",
    marginBottom: 20
  };
 return  useMemo(() => {

    return (
      <div>
      {console.log(".......child re load.................")}

        <Modal
          title="添加分类"
          visible={visible}
          onOk={handleOk}
          width="600px"
          onCancel={handleCancel}
        >
          <Input
            style={normalCenter}
            addonBefore="分类名"
            size="large"
            placeholder="分类名"
            name="name"
            value={name}
            onChange={handleChange}
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
    )
  },[visible, name, desc, handleOk, handleCancel, handleChange, handleDescChange,normalCenter]);
})
export default LinkComponent;