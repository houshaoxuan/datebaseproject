import React, { PureComponent } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;
// const Option = Select.Option;
export default class AddForm extends PureComponent {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
  };
  render() {
    const formItemLayout = {
        labelCol: { span: 4 }, //左侧label宽度
        wrapperCol: { span: 10,offset: 2 }, //右侧包裹输入框宽度
      };
    return (
      <Form 
      {...formItemLayout}
      onValuesChange={(_, allFields) => {
        this.props.setForm(allFields);
      }}
      >
      {/* <Form onValuesChange={this.onFinish}> */}
        <Item
          label="j_id"
          name="j_id"
          rules={[{ required: true, message: "工种id必须输入!" }]}
        >
          <Input
            placeholder="请输入工种id"
          ></Input>
        </Item>
        <Item
        {...formItemLayout}
          label="名称"
          name="name"
          rules={[{ required: true, message: "名称必须输入!" }]}
        >
          <Input
            placeholder="请输入工种名称"
          ></Input>
        </Item>
        <Item
          label="基础工资"
          name="base"
          rules={[{ required: true, message: "基础工资必须输入!" }]}
        >
          <Input
            placeholder="请输入基础工资"
          ></Input>
        </Item>
        <Item
          label="等级"
          name="level"
          rules={[{ required: true, message: "等级必须输入!" }]}
        >
          <Input
            placeholder="请输入等级"
          ></Input>
        </Item>
      </Form>
    );
  }
}
