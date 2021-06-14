import {HomeOutlined,AppstoreAddOutlined,BarsOutlined,UserOutlined,AreaChartOutlined} from '@ant-design/icons';

const menuList = [
  {
    title: "员工基本信息", // 菜单标题名称
    key: "/staff", // 对应的 path
    icon: <HomeOutlined/>, // 图标名称
  },
  {
    title: "员工工资信息",
    key: "/salary",
    icon: <AppstoreAddOutlined />,
  },
  {
    title: "员工考勤信息",
    key: "/check",
    icon: <UserOutlined />,
  },
  {
    title: "员工工种信息",
    key: "/jobtype",
    icon: <AreaChartOutlined/>,
  },
  {
    title: '部门信息',
    key: '/department',
    icon: <BarsOutlined />
  }
];
export default menuList;
