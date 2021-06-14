import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
export default class UpdateForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }

    render() {
        const {department} = this.props
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
          label="d_id"
          name="d_id"
          rules={[{ required: true, message: "d_id必须输入!" }]}
          initialValue={department?department.d_id:''}
        >
          <Input
            placeholder="请输入d_id"
            disabled
          ></Input>
        </Item>
        <Item
        {...formItemLayout}
          label="部门名称"
          name="name"
          rules={[{ required: true, message: "部门名称必须输入!" }]}
          initialValue={department?department.name:''}
        >
          <Input
            placeholder="请输入部门名称"
          ></Input>
        </Item>
        <Item
        {...formItemLayout}
          label="总工资"
          name="totalsalary"
          rules={[{ required: true, message: "总工资必须输入!" }]}
          initialValue={department?department.totalsalary:''}
        >
          <Input
            placeholder="请输入总工资"
          ></Input>
        </Item>
        <Item
          label="总人数"
          name="totalperson"
          rules={[{ required: true, message: "总人数必须输入!" }]}
          initialValue={department?department.totalperson:''}
        >
          <Input
            placeholder="请输入总人数"
          ></Input>
        </Item>
          </Form>
        );
    }
}
