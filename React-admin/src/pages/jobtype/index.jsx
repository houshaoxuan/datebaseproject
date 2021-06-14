import React, { Component, } from "react";
import { connect } from 'react-redux'
import { Card, Button, Table, Modal, message } from "antd";
import LinkButton from "../../component/link-button";
import { PAGE_SIZE } from "../../utils/constant";
import { jobtypeAdd, jobtypeDelete, jobtypeQuery, jobtypeUpdate} from "../../api";
import AddForm from "./add-form.jsx";
import UpdateForm from "./updataform.jsx"
import { logout } from "../../redux/actions";

/* 角色路由 */
 class Role extends Component {
  state = {
    loading: false,
    jobtypes: [],
    jobtype: {},
    showStatus: 0,
  };
  getJobtype = async () => {
    const result = await jobtypeQuery();
    if (result.status === 0) {
      const jobtypes = result.data;
      this.setState({
        jobtypes,
      });
    }
  };
  initColumn = () => {
    this.columns = [
      {
        title: "j_id",
        dataIndex: "j_id",
      },
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "基础工资",
        dataIndex: "base",
      },
      {
        title: "等级",
        dataIndex: "level",
      },
      {
        title: "操作",
        width: 300,
        dataIndex: "",
        render: (jobtype) => (
          <span>
            <LinkButton
              onClick={() => {
                this.jobtype = jobtype;
                this.setState({ showStatus: 2 });
              }}
              style={{color: 'green'}}
            >
              修改信息
            </LinkButton>{" "}
            <LinkButton
              onClick={() => {
                jobtypeDelete(jobtype.j_id)
                this.getJobtype();
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
  addJobtype = async () => {
    let { j_id,name,base,level } = this.form;
    const result = await jobtypeAdd(j_id,name,base,level);
    console.log(result)
    if (result.status === 0) {
      message.success("添加工种成功");
      this.getJobtype();
    } else {
      message.error("添加工种失败");
    }
    this.setState({ showStatus: 0 });
  }
  updateJobtype = async () => {
    let {j_id,name,base,level} = this.form;
    const result = await jobtypeUpdate(j_id,name,base,level);
    if (result.status === 0) {
      message.success("修改工种成功");
      this.getJobtype();
    } else {
      message.error("修改工种失败");
    }
    this.setState({ showStatus: 0 });
    this.jobtype = {}  
  }
  componentDidMount() {
    this.getJobtype();
  }
  UNSAFE_componentWillMount() {
    this.initColumn();
  }
  render() {
    const { jobtypes,  showStatus } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={() => this.setState({ showStatus: 1 })}>
          添加工种
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          rowKey= {(record) => {
            return record.j_id
          }}
          pagination={{
            pageSize: PAGE_SIZE,
            // , total: 50
          }}
          dataSource={jobtypes}
          columns={this.columns}
          loading={this.state.loading}
          onRow={(jobtype) => {
            return {
              onClick: (event) => {
                this.setState({ jobtype });
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
          title="添加工种"
          visible={showStatus === 1}
          onOk={this.addJobtype}
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
          title="修改工种"
          visible={showStatus === 2}
          onCancel={this.handleCancel}
          destroyOnClose={true} //让对话框关闭时候清空输入值
          onOk={this.updateJobtype}
        >
          <UpdateForm
            jobtype={this.state.jobtype ? this.state.jobtype : ''}
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