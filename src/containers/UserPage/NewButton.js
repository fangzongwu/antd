import React from "react";
import { observer } from "mobx";
import { Modal, Button, Input, Form, message } from 'antd';
import User from "../.././models/User";
import "./UserPage.css";

const FormItem = Form.Item;

class NewButtonModal extends React.Component {
  state = {
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
  	const { validateFields, resetFields } = this.props.form;
    validateFields((err, values) => {
      if (err) {
        message.error('请补全缺少字段');
      } else {
         console.log(values);
         let userName = encodeURIComponent(values.userName, "utf-8");
         let userAge = encodeURIComponent(values.userAge, "utf-8");
         let userAddress = encodeURIComponent(values.userAddress, "utf-8");
         User.create("http://localhost:8001/addInfo", {
            mode: "cors",
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `name=${userName}&age=${userAge}&address=${userAddress}`
          });
        resetFields();
        message.info('创建成功');
        // User.fetchDataFromUrl();
        this.handleCancel();

      }
    });
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>添加</Button>
        <Modal title="添加用户"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[ 
            <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" size="large" onClick={this.handleOk}>  
              保存
            </Button>,
          ]}
        >
          <Form className="int-block" onSubmit={this.handleOk} >
          	<FormItem>
          		{getFieldDecorator('userName', {
	            rules: [{ required: true, message: 'Please input your username!' }],
	          	})(
	           		<Input placeholder="请输入姓名" />
	          	)}
          	</FormItem>
          	<FormItem>
          		{getFieldDecorator('userAge', {
	            rules: [{ required: true, message: 'Please input your userAge!' }],
	          	})(
	           		<Input placeholder="请输入年龄" />
	          	)}
          	</FormItem>
          	<FormItem>
          		{getFieldDecorator('userAddress', {
	            rules: [{ required: true, message: 'Please input your userAddress!' }],
	          	})(
	           		<Input placeholder="请输入地址" />
	          	)}
          	</FormItem>
          </Form>
        </Modal>
      </div>
    );
  }

}

export default Form.create()(NewButtonModal);


