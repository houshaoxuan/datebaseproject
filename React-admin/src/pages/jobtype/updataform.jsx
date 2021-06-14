import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
export default class UpdateForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }

    render() {
        const {jobtype} = this.props
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
          label="j_id"
          name="j_id"
          rules={[{ required: true, message: "j_id必须输入!" }]}
          initialValue={jobtype?jobtype.j_id:''}
        >
          <Input
            placeholder="请输入j_id"
            disabled
          ></Input>
        </Item>
        <Item
        {...formItemLayout}
          label="工种名称"
          name="name"
          rules={[{ required: true, message: "工种名称必须输入!" }]}
          initialValue={jobtype?jobtype.name:''}
        >
          <Input
            placeholder="请输入工种名称"
          ></Input>
        </Item>
        <Item
        {...formItemLayout}
          label="基础工资"
          name="base"
          rules={[{ required: true, message: "基础工资必须输入!" }]}
          initialValue={jobtype?jobtype.base:''}
        >
          <Input
            placeholder="请输入基础工资"
          ></Input>
        </Item>
        <Item
          label="等级"
          name="level"
          rules={[{ required: true, message: "等级必须输入!" }]}
          initialValue={jobtype?jobtype.level:''}
        >
          <Input
            placeholder="请输入等级"
          ></Input>
        </Item>
          </Form>
        );
    }
}
