import React from "react";
import { observer } from "mobx-react";
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import NewButton from "./NewButton";
import dataSource from "../.././models/User";
import "./UserPage.css";


@observer
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
  }
  render() {
    const { value } = this.state;
    return (
      <div className="editable-cell">
            <div className="editable-cell-text-wrapper">
              {value}
            </div>
      </div>
    );
  }
}

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [{
      title: '姓名',
      dataIndex: 'name',
      width: '30%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
        />
      ),
    }, {
      title: '年龄',
      dataIndex: 'age',
    }, {
      title: '地址',
      dataIndex: 'address',
    }, {  
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          dataSource.length > 1 ?
          (
            <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(index)}>
              <a href="#">删除</a>
            </Popconfirm>
          ) : null
        );
      },
    }];



    this.state = {
      count: 2,
    };
  }



  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.setState({ dataSource });
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  render() {
    const columns = this.columns;
    return (
      <div>
        <NewButton />
        <Button className="editable-add-btn" onClick={this.handleAdd}>添加</Button>
        <Table bordered dataSource={dataSource} columns={columns} />

      </div>
    );
  }
}