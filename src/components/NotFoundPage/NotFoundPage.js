import React from "react";
import "./NotFoundPage.css";
import { Link } from "react-router";

export default class NotFoundPage extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		return <div className="not-page">
			<img src={require('./404.jpg')} alt="404页面"/>
			<span>对不起，您访问的页面不存在！</span>
			<Link to=""> 返回首页 </Link>
		</div>
	}
}
