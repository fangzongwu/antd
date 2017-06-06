import React from "react";
import { Modal, Form, Button, Input } from 'antd';
import { observer } from "mobx-react";
import User from "../.././models/User";
import "./UserPage.css";

const FormItem = Form.Item;

@observer
class UpdateData extends React.Component {
	constructor(props) {
		super(props);
		this.state = { visible: false }
	}
	
  	showModal = () => {
	    this.setState({
	      visible: true,
	    });
  	}
  	handleOk = (e) => {
	    const { validateFields, resetFields } = this.props.form;
	    e.preventDefault();
	    // console.log(e);
	    this.setState({
	      visible: false,
	    });
	    validateFields((err, values) => {
	      if (err) {
	        console.log("出现错误了");
	      }else{
	      	console.log('Received values of form: ', values);
	        let userName = encodeURIComponent(values.userName, "utf-8");
         	let userAge = encodeURIComponent(values.userAge, "utf-8");
         	let userAddress = encodeURIComponent(values.userAddress, "utf-8");
         	User.create("http://192.168.1.53:8001/updateInfo", {
            	mode: "cors",
            	method: "POST",
            	headers: {"Content-Type": "application/x-www-form-urlencoded"},
            	body: `name=${userName}&age=${userAge}&address=${userAddress}`
          	});
	      }
	    });
  	}
  	handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	      visible: false,
	    });
  	}
	render() {
		const { getFieldDecorator } = this.props.form;
		var count = this.props.store;
		const { dataSource } = User.data;

		return <span>
			<a href="#" onClick={this.showModal} >编辑</a>
			<Modal
			  className="a-modal"
	          title="修改信息"
	          visible={this.state.visible}
	          onOk={this.handleOk}
	          onCancel={this.handleCancel}
	        >
	          <Form layout="inline" onSubmit={this.handleOk}>
		        <FormItem>
	          		{getFieldDecorator('userName', {
		            rules: [{ required: true, message: '姓名不能为空!' }],
		            initialValue: dataSource[count].name,
		          	})(
		           		<Input className="a-int" placeholder="请输入姓名" disabled />
		          	)}
	          	</FormItem>
	          	<FormItem>
	          		{getFieldDecorator('userAge', {
		            rules: [{ required: true, message: '年龄不能为空!' }],
		            initialValue: dataSource[count].age,
		          	})(
		           		<Input placeholder="请输入年龄" />
		          	)}
	          	</FormItem>
	          	<FormItem>
	          		{getFieldDecorator('userAddress', {
		            rules: [{ required: true, message: '地址不能为空!' }],
		            initialValue: dataSource[count].address,
		          	})(
		           		<Input placeholder="请输入地址" />
		          	)}
	          	</FormItem>
		      </Form>
	        </Modal>
		</span>
	}
}
export default Form.create()(UpdateData);
