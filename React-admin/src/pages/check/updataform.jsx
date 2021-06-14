import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
export default class UpdateForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }

    render() {
        const {check} = this.props
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
          initialValue={check?check.p_id:''}
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
          initialValue={check?check.time:''}
        >
          <Input
            placeholder="请输入日期"
            disabled
          ></Input>
        </Item>
        <Item
          label="加班天数"
          name="e_day"
          rules={[{ required: true, message: "加班天数必须输入!" }]}
          initialValue={check?check.e_day:''}
        >
          <Input
            placeholder="请输入加班天数"
          ></Input>
        </Item>
        <Item
          label="缺勤天数"
          name="l_day"
          rules={[{ required: true, message: "缺勤天数必须输入!" }]}
          initialValue={check?check.l_day:''}
        >
          <Input
            placeholder="请输入缺勤天数"
          ></Input>
        </Item>
        <Item
          label="津贴"
          name="subsidy"
          rules={[{ required: true, message: "津贴必须输入!" }]}
          initialValue={check?check.subsidy:''}
        >
          <Input
            placeholder="请输入津贴"
          ></Input>
        </Item>
          </Form>
        );
    }
}
