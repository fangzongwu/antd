import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { observer } from "mobx-react";
import User from "../.././models/User";
import "./Login.css";


const FormItem = Form.Item;

@observer
class Login extends React.Component {
	constructor(props) {
		super(props);

	}
	handleSubmit = (e) => {
	    e.preventDefault();
	    const { validateFields, resetFields } = this.props.form;
	    validateFields((err, values) => {
         let name = encodeURIComponent(values.uname, "utf-8");

	      if (!err) {
	        console.log('Received values of form: ', values);
	        User.loginTo("http://192.168.1.53:8001/userLogin", {
            	mode: "cors",
            	method: "POST",
            	headers: {"Content-Type": "application/x-www-form-urlencoded"},
            	body: `name=${name}`
          });
	        resetFields();
	      }
	    });
	  }
	render() {
    	const { getFieldDecorator } = this.props.form;
		return <div className="login-bg">
			<Row>
		      <Col span={4} className="col-span">
  				<div>
					<Form onSubmit={this.handleSubmit} className="login-form">
				        <FormItem>
				          {getFieldDecorator('uname', {
				            rules: [{ required: true, message: '姓名不能为空!' }],
				          })(
				            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="text" placeholder="请输入姓名" />
				          )}
				        </FormItem>
				        <FormItem>
				          {getFieldDecorator('password', {
				            rules: [{ required: true, message: '密码不能为空!' }],
				          })(
				            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
				          )}
				        </FormItem>
				        <FormItem>
				          {getFieldDecorator('remember', {
				            valuePropName: 'checked',
				            initialValue: true,
				          })(
				            <Checkbox>同意本公司的服务条款</Checkbox>
				          )}
				          <Button type="" htmlType="submit" className="login-form-button block-p">
				            登 录
				          </Button>
				        </FormItem>
				      </Form>
				</div>
		      </Col>
		    </Row>
		</div>

	}

}

export default Form.create()(Login);