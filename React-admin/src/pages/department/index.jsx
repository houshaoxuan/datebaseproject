import React, { Component, } from "react";
import { connect } from 'react-redux'
import { Card, Button, Table, Modal, message } from "antd";
import LinkButton from "../../component/link-button";
import { PAGE_SIZE } from "../../utils/constant";
import { departmentAdd, departmentDelete, departmentQuery, departmentUpdate} from "../../api";
import AddForm from "./add-form.jsx";
import UpdateForm from "./updataform.jsx"
import { logout } from "../../redux/actions";

/* 角色路由 */
 class Role extends Component {
  state = {
    loading: false,
    departments: [],
    department: {},
    showStatus: 0,
  };
  getDepartment = async () => {
    const result = await departmentQuery();
    if (result.status === 0) {
      const departments = result.data;
      this.setState({
        departments,
      });
    }
  };
  initColumn = () => {
    this.columns = [
      {
        title: "d_id",
        dataIndex: "d_id",
      },
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "总工资",
        dataIndex: "totalsalary",
      },
      {
        title: "总人数",
        dataIndex: "totalperson",
      },
      {
        title: "操作",
        width: 300,
        dataIndex: "",
        render: (department) => (
          <span>
            <LinkButton
              onClick={() => {
                this.department = department;
                this.setState({ showStatus: 2 });
              }}
              style={{color: 'green'}}
            >
              修改信息
            </LinkButton>{" "}
            <LinkButton
              onClick={() => {
                departmentDelete(department.d_id)
                this.getDepartment();
              }}
              style={{color: 'green'}}
            >
              删除信息
            </LinkButton>
          </span>
        ),
      }
    ];
  };
  handleCancel = () => {
    this.setState({ showStatus: 0 });
  };
  addDepartment = async () => {
    let { d_id,name,totalsalary,totalperson } = this.form;
    const result = await departmentAdd(d_id,name,totalsalary,totalperson);
    console.log(result)
    if (result.status === 0) {
      message.success("添加部门信息成功");
      this.getDepartment();
    } else {
      message.error("添加部门信息失败");
    }
    this.setState({ showStatus: 0 });
  }
  updateDepartment = async () => {
    let {d_id,name,totalsalary,totalperson} = this.form;
    const result = await departmentUpdate(d_id,name,totalsalary,totalperson);
    if (result.status === 0) {
      message.success("修改部门信息成功");
      this.getDepartment();
    } else {
      message.error("修改部门信息失败");
    }
    this.setState({ showStatus: 0 });
    this.department = {}  
  }
  componentDidMount() {
    this.getDepartment();
  }
  UNSAFE_componentWillMount() {
    this.initColumn();
  }
  render() {
    const { departments,  showStatus } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={() => this.setState({ showStatus: 1 })}>
          添加部门信息
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          rowKey= {(record) => {
            return record.d_id
          }}
          pagination={{
            pageSize: PAGE_SIZE,
            // , total: 50
          }}
          dataSource={departments}
          columns={this.columns}
          loading={this.state.loading}
          onRow={(department) => {
            return {
              onClick: (event) => {
                this.setState({ department });
              }, // 点击行
              onDoubleClick: (event) => {},
              onContextMenu: (event) => {},
              onMouseEnter: (event) => {}, // 鼠标移入行
              onMouseLeave: (event) => {},
            };
          }}
          bordered
        />
        <Modal
          title="添加部门信息"
          visible={showStatus === 1}
          onOk={this.addDepartment}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <AddForm
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
        <Modal
          title="修改部门信息"
          visible={showStatus === 2}
          onCancel={this.handleCancel}
          destroyOnClose={true} //让对话框关闭时候清空输入值
          onOk={this.updateDepartment}
        >
          <UpdateForm
            department={this.state.department ? this.state.department : ''}
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
      </Card>
    );
  }
}
export default connect(state=>({user:state.user}),{logout})(Role)