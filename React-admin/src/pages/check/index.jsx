import React, { Component, } from "react";
import { connect } from 'react-redux'
import { Card, Button, Table, Modal, message } from "antd";
import LinkButton from "../../component/link-button";
import { PAGE_SIZE } from "../../utils/constant";
import { checksAdd, checksDelete, checksQuery, checksUpdate} from "../../api";
import AddForm from "./add-form.jsx";
import UpdateForm from "./updataform.jsx"
import { logout } from "../../redux/actions";

/* 角色路由 */
 class Role extends Component {
  state = {
    loading: false,
    checks: [],
    check: {},
    showStatus: 0,
  };
  getChecks = async () => {
    const result = await checksQuery();
    if (result.status === 0) {
      const checks = result.data;
      this.setState({
        checks,
      });
    }
  };
  initColumn = () => {
    this.columns = [
      {
        title: "id",
        dataIndex: "p_id",
      },
      {
        title: "时间",
        dataIndex: "time",
      },
      {
        title: "加班天数",
        dataIndex: "e_day",
      },
      {
        title: "缺勤天数",
        dataIndex: "l_day",
      },
      {
        title: "津贴",
        dataIndex: "subsidy",
      },
      {
        title: "操作",
        width: 300,
        dataIndex: "",
        render: (check) => (
          <span>
            <LinkButton
              onClick={() => {
                this.check = check;
                this.setState({ showStatus: 2 });
              }}
              style={{color: 'green'}}
            >
              修改信息
            </LinkButton>{" "}
            <LinkButton
              onClick={() => {
                checksDelete(check.p_id,check.time)
                this.getChecks();
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
  addCheck = async () => {
    let { p_id,time,e_day,l_day,subsidy } = this.form;
    const result = await checksAdd(p_id,time,e_day,l_day,subsidy);
    console.log(result)
    if (result.status === 0) {
      message.success("添加考勤信息成功");
      this.getChecks();
    } else {
      message.error("添加考勤信息失败");
    }
    this.setState({ showStatus: 0 });
  }
  updateCheck = async () => {
    let {p_id,time,e_day,l_day,subsidy} = this.form;
    const result = await checksUpdate(p_id,time,e_day,l_day,subsidy);
    if (result.status === 0) {
      message.success("修改考勤信息成功");
      this.getChecks();
    } else {
      message.error("修改考勤信息失败");
    }
    this.setState({ showStatus: 0 });
    this.check = {}  
  }
  componentDidMount() {
    this.getChecks();
  }
  UNSAFE_componentWillMount() {
    this.initColumn();
  }
  render() {
    const { checks,  showStatus } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={() => this.setState({ showStatus: 1 })}>
          添加考勤信息
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          rowKey= {(record) => {
            return record.p_id + record.time
          }}
          pagination={{
            pageSize: PAGE_SIZE,
            // , total: 50
          }}
          dataSource={checks}
          columns={this.columns}
          loading={this.state.loading}
          onRow={(check) => {
            return {
              onClick: (event) => {
                this.setState({ check });
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
          title="添加考勤信息"
          visible={showStatus === 1}
          onOk={this.addCheck}
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
          title="修改考勤信息"
          visible={showStatus === 2}
          onCancel={this.handleCancel}
          destroyOnClose={true} //让对话框关闭时候清空输入值
          onOk={this.updateCheck}
        >
          <UpdateForm
            check={this.state.check ? this.state.check : ''}
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