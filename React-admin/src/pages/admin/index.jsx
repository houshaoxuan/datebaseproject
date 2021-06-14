import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { connect } from "react-redux";

// import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../component/left-nav/index.jsx";
import Header from "../../component/header";
import Staff from "../staff";
import Salary from "../salary";
import Check from "../check";
import Jobtype from "../jobtype";
import Department from "../department";
import NotFound from "../not-found/index";
const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  render() {
    const user = this.props.user;
    // 如果内存中没有存储user ==>当前没登陆
    if (!user || !user.username) {
      //自动跳转到登陆
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Layout style={{ height: "100%", width: "100%" }}>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            {/* 设置固定侧边栏 */}
            <LeftNav />
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header>Header</Header>
            <Content style={{ margin: 20, backgroundColor: "white" }}>
              <Switch>
                <Redirect exact={true} from="/" to="/staff" />
                <Route path="/staff" component={Staff} />
                <Route path="/salary" component={Salary} />
                <Route path="/check" component={Check} />
                <Route path="/jobtype" component={Jobtype} />
                <Route path="/department" component={Department} />
                <Route component={NotFound} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              推荐使用谷歌浏览器，来获得更佳操作体验
            </Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}
export default connect((state) => ({ user: state.user }), {})(Admin);
