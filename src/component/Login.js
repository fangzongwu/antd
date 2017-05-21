import React from 'react';
import {Link} from 'react-router';                
import { Form, Icon, Input, Button } from 'antd';
import "./login.css";
import $ from "jquery";
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        // fetch("http://127.0.0.1:8000/addstudent", { method: "GET", body: {name: "haha"},  mode: "cors" }).then( function(response) {
        // 	return response.json();
        // }).then( function(jsonData) {
        // 	console.log(jsonData);
        // }).catch( function() {
        // 	console.log("出错了");
        // })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className="login-block">
			      <Form onSubmit={this.handleSubmit} className="login-form">
			        <FormItem>
			          {getFieldDecorator('userName', {
			            rules: [{ required: true, message: 'Please input your username!' }],
			          })(
			            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入姓名" />
			          )}
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator('password', {
			            rules: [{ required: true, message: 'Please input your Password!' }],
			          })(
			            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
			          )}
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator('remember', {
			            valuePropName: 'checked',
			            initialValue: true,
			          })(
			            <a href="">还没有注册？现在注册</a>
			          )}
			          <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
			          <Button type="primary" htmlType="submit" className="login-form-button">
			            登录
			          </Button>
			          
			        </FormItem>
			      </Form>
    	</div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;
