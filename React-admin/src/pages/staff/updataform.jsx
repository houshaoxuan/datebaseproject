import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
export default class UpdateForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }

    render() {
        const {staff} = this.props
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
              label="姓名"
              name="name"
              rules={[{ required: true, message: "姓名必须输入!" }]}
              initialValue={staff?staff.name:''}
            >
              <Input
                placeholder="请输入姓名" 
              ></Input>
            </Item>
            <Item
            {...formItemLayout}
              label="员工id"
              name="p_id"
              rules={[{ required: true, message: "员工id必须输入!" }]}
              initialValue={staff?staff.p_id:''}
            >
              <Input
                placeholder="请输入p_id"
                disabled
              ></Input>
            </Item>
            <Item
              label="性别"
              name="gender"
              rules={[{ required: true, message: "性别必须输入!" }]}
              initialValue={staff?staff.gender:''}
            >
              <Input
                placeholder="请输入性别"
              ></Input>
            </Item>
            <Item
              label="年龄"
              name="age"
              rules={[{ required: true, message: "年龄必须输入!" }]}
              initialValue={staff?staff.age:''}
            >
              <Input
                placeholder="请输入年龄"
              ></Input>
            </Item>
            <Item
              label="工种id"
              name="t_id"
              rules={[{ required: true, message: "工种id必须输入!" }]}
              initialValue={staff?staff.t_id:''}
            >
              <Input
                placeholder="请输入工种id"
              ></Input>
            </Item>
            <Item
              label="部门id"
              name="d_id"
              rules={[{ required: true, message: "部门id必须输入!" }]}
              initialValue={staff?staff.d_id:''}
            >
              <Input
                placeholder="请输入部门id"
              ></Input>
            </Item>
            <Item
              label="等级"
              name="level"
              rules={[{ required: true, message: "等级必须输入!" }]}
              initialValue={staff?staff.level:''}
            >
              <Input
                placeholder="请输入等级"
              ></Input>
            </Item>
          </Form>
        );
    }
}
