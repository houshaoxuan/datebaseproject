import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
export default class UpdateForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }

    render() {
        const {salary} = this.props
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
        <Item
          label="id"
          name="p_id"
          rules={[{ required: true, message: "id必须输入!" }]}
          initialValue={salary?salary.p_id:''}
        >
          <Input
            placeholder="请输入id"
            disabled
          ></Input>
        </Item>
        <Item
        {...formItemLayout}
          label="日期"
          name="time"
          rules={[{ required: true, message: "日期必须输入!" }]}
          initialValue={salary?salary.time:''}
        >
          <Input
            placeholder="请输入日期"
            disabled
          ></Input>
        </Item>
        <Item
          label="基础工资"
          name="base"
          rules={[{ required: true, message: "基础工资必须输入!" }]}
          initialValue={salary?salary.base:''}
        >
          <Input
            placeholder="请输入工基础资"
          ></Input>
        </Item>
        <Item
          label="额外工资"
          name="extra"
          rules={[{ required: true, message: "额外工资必须输入!" }]}
          initialValue={salary?salary.extra:''}
        >
          <Input
            placeholder="请输入额外工资"
          ></Input>
        </Item>
        <Item
          label="已支付工资"
          name="paid"
          rules={[{ required: true, message: "已支付工资必须输入!" }]}
          initialValue={salary?salary.paid:''}
        >
          <Input
            placeholder="请输入已支付工资"
          ></Input>
        </Item>
        <Item
          label="应支付工资"
          name="willpay"
          rules={[{ required: true, message: "应支付工资必须输入!" }]}
          initialValue={salary?salary.willpay:''}
        >
          <Input
            placeholder="请输入应支付工资"
          ></Input>
        </Item>
          </Form>
        );
    }
}
