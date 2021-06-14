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
          label="id"
          name="p_id"
          rules={[{ required: true, message: "id必须输入!" }]}
        >
          <Input
            placeholder="请输入id"
          ></Input>
        </Item>
        <Item
        {...formItemLayout}
          label="日期"
          name="time"
          rules={[{ required: true, message: "日期必须输入!" }]}
        >
          <Input
            placeholder="请输入日期"
          ></Input>
        </Item>
        <Item
          label="加班天数"
          name="e_day"
          rules={[{ required: true, message: "加班天数必须输入!" }]}
        >
          <Input
            placeholder="请输入加班天数"
          ></Input>
        </Item>
        <Item
          label="缺勤天数"
          name="l_day"
          rules={[{ required: true, message: "缺勤天数必须输入!" }]}
        >
          <Input
            placeholder="请输入缺勤天数"
          ></Input>
        </Item>
        <Item
          label="津贴"
          name="subsidy"
          rules={[{ required: true, message: "津贴必须输入!" }]}
        >
          <Input
            placeholder="请输入津贴"
          ></Input>
        </Item>
      </Form>
    );
  }
}
