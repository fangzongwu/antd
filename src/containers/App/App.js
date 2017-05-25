import React from "react";
import {Link} from "react-router";
import { Menu, Icon, Switch } from 'antd';
import "./App.css";
const SubMenu = Menu.SubMenu;

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
    theme: 'dark',
    current: '1',
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div>
        <aside className="aside-block">
          <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 220 }}
          selectedKeys={[this.state.current]}
          mode="inline"
          >
            <SubMenu key="sub1" title={<span><Icon style={{ fontSize: 18 }} type="user" /><span style={{fontSize: 16}}>用户管理</span></span>}>
              <Menu.Item key="1">
                <Link to="/user">用户列表</Link>
              </Menu.Item>

              <Menu.Item key="2">角色配置</Menu.Item>
            </SubMenu>
          </Menu>
        </aside>
        <div className="main-block">
          <div className="main-child">
              {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
