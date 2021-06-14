import React, { Component, } from "react";
import { connect } from 'react-redux'
import { Card, Button, Table, Modal, message } from "antd";
import LinkButton from "../../component/link-button";
import { PAGE_SIZE } from "../../utils/constant";
import { staffQuery,staffAdd,staffUpdate,staffDelete} from "../../api";
import AddForm from "./add-form.jsx";
import UpdateForm from "./updataform.jsx"
import { logout } from "../../redux/actions";

/* 角色路由 */
 class Role extends Component {
  state = {
    loading: false,
    staffs: [],
    staff: {},
    showStatus: 0,
  };
  constructor(props){
      super(props)
      this.auth= React.createRef()
  }
  getStaffs = async () => {
    const result = await staffQuery();
    if (result.status === 0) {
      const staffs = result.data;
      this.setState({
        staffs,
      });
    }
  };
  initColumn = () => {
    this.columns = [
      {
        title: "姓名",
        dataIndex: "name",
      },
      {
        title: "id",
        dataIndex: "p_id",
      },
      {
        title: "性别",
        dataIndex: "gender",
      },
      {
        title: "年龄",
        dataIndex: "age",
      },
      {
        title: "工种",
        dataIndex: "jobtype",
      },
      {
        title: "部门",
        dataIndex: "department",
      },
      {
        title: "等级",
        dataIndex: "level",
      },
      {
        title: "操作",
        width: 300,
        dataIndex: "",
        render: (staff) => (
          <span>
            <LinkButton
              onClick={() => {
                this.staff = staff;
                this.setState({ showStatus: 2 });
              }}
              style={{color: 'green'}}
            >
              修改信息
            </LinkButton>{" "}
            <LinkButton
              onClick={() => {
                staffDelete(staff.p_id)
                this.getStaffs();
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
  addStaff = async () => {
    let {name,p_id,gender,age,t_id,d_id,level} = this.form;
    const result = await staffAdd(name,p_id,gender,age,t_id,d_id,level);
    if (result.status === 0) {
      message.success("添加角色成功");
      this.getStaffs();
    } else {
      message.error("添加角色失败");
    }
    this.setState({ showStatus: 0 });
  }
  updateStaff = async () => {
    let {name,p_id,gender,age,t_id,d_id,level} = this.form;
    const result = await staffUpdate(name,p_id,gender,age,t_id,d_id,level);
    if (result.status === 0) {
      message.success("添加角色成功");
      this.getStaffs();
    } else {
      message.error("添加角色失败");
    }
    this.setState({ showStatus: 0 });
    this.staff = {}  
  }
  componentDidMount() {
    this.getStaffs();
  }
  UNSAFE_componentWillMount() {
    this.initColumn();
  }
  render() {
    const { staffs,  showStatus } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={() => this.setState({ showStatus: 1 })}>
          添加员工
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          rowKey="p_id"
          pagination={{
            pageSize: PAGE_SIZE,
            // , total: 50
          }}
          dataSource={staffs}
          columns={this.columns}
          loading={this.state.loading}
          onRow={(staff) => {
            return {
              onClick: (event) => {
                this.setState({ staff });
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
          title="添加员工"
          visible={showStatus === 1}
          onOk={this.addStaff}
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
          title="修改员工"
          visible={showStatus === 2}
          onCancel={this.handleCancel}
          destroyOnClose={true} //让对话框关闭时候清空输入值
          onOk={this.updateStaff}
        >
          <UpdateForm
            staff={this.state.staff ? this.state.staff : ''}
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