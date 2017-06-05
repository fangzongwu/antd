import React from "react";
import { Popconfirm, Breadcrumb, Icon, Input, Row, Col } from "antd";
import {observer} from "mobx-react";
import user from "../.././models/User";
import "./UserPage.css";

const Search = Input.Search;
@observer
class SearchBox extends React.Component {
	constructor(props) {
		super(props);
	};
	handleSearch(val) {
		user.filter = val;
	}
	render() {
		return <div className="mar-bottom">
			<Row>
		      <Col span={12}>
	      		<Breadcrumb>
		            <Breadcrumb.Item href="/">
		                <Icon type="home" />
		                <span>首页</span>
		            </Breadcrumb.Item>
		            <Breadcrumb.Item>
		               用户列表
		            </Breadcrumb.Item>
		        </Breadcrumb>
		      </Col>
		      <Col span={12} className="text-a">
	      		<Search
				placeholder="输入姓名进行检索"
				style={{ width: 400, height: 35 }}
				onSearch={this.handleSearch}
				/>
		      </Col>
		    </Row>	
		</div>
	}
} 

export default SearchBox;