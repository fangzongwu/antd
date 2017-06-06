import React from "react";
import { Row, Col } from "antd";
import "./HomePage.css";
export default class Home extends React.Component {
	constructor(props) {
		super(props); 
		this.state = {
			textOne: "慢病健康管理",
			textTwo: "御易健",
		}
	}
	render() {
		return <div className="h-page">
			<Row>
				<Col span={6} className="block-col block-one">
					<div> {this.state.textOne} </div>
				</Col>
				<Col span={6} className="block-col block-two">
					<div> {this.state.textOne} </div>
				</Col>
				<Col span={6} className="block-col block-one">
					<div> {this.state.textOne} </div>
				</Col>
			</Row>
		</div>
	}
}