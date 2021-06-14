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
          label="d_id"
          name="d_id"
          rules={[{ required: true, message: "部门id必须输入!" }]}
        >
          <Input
            placeholder="请输入部门id"
          ></Input>
        </Item>
        <Item
        {...formItemLayout}
          label="名称"
          name="name"
          rules={[{ required: true, message: "名称必须输入!" }]}
        >
          <Input
            placeholder="请输入部门名称"
          ></Input>
        </Item>
        <Item
          label="总工资"
          name="totalsalary"
          rules={[{ required: true, message: "总工资必须输入!" }]}
        >
          <Input
            placeholder="请输入总工资"
          ></Input>
        </Item>
        <Item
          label="总人数"
          name="totalperson"
          rules={[{ required: true, message: "总人数必须输入!" }]}
        >
          <Input
            placeholder="请输入总人数"
          ></Input>
        </Item>
      </Form>
    );
  }
}
