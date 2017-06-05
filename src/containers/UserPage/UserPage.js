import React from "react";
import { observer } from "mobx-react";
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import NewButton from "./NewButton";
import user from "../.././models/User";
import SearchBox from "./Search";
import UpdateData from "./update"; 
import "./UserPage.css";

@observer
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
  }


  render() {
    const { value } = this.state;
    const {dataSource} = user.data;
    return (
      <div className="editable-cell">
            <div className="editable-cell-text-wrapper">
              {value}
            </div>
      </div>
    );
  }
}

@observer
export class EditableTable extends React.Component {
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
        const {dataSource} = user.data;
        return (
          dataSource.length >= 1 ?
          (
            <span>
              {/*<a href="#" onClick={() => this.updateState(index)} >编辑</a>*/}
              <UpdateData store={index} />
              <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(index)}>
                <a href="#" style={{marginLeft: 15}}>删除</a>
              </Popconfirm>
            </span>        
          ) : null
        );
      },
    }];

    // this.state = {
    //   count: 2,
    // };
  }
  
  componentDidMount() {
   user.fetchDataFromUrl();
  }

  onDelete = (index) => {
    // const dataSource = [...this.state.dataSource];
    // dataSource.splice(index, 1);
    // this.setState({ dataSource });
    const {dataSource} = user.data;
    user.create("http://localhost:8001/deleteInfo", {
            mode: "cors",
            method: "POST", 
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `key=${dataSource[index].key}`
          });
    //user.fetchDataFromUrl();
  }
  // handleAdd = () => {
  //   const { count, dataSource } = this.state;
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   this.setState({
  //     dataSource: [...dataSource, newData],
  //     count: count + 1,
  //   });
  // }
  updateState = (index) => {
    console.log(index);


  }



  render() {
    const columns = this.columns;
    // console.log(dataSource)
    return (
      <div>
        <SearchBox />
        <NewButton />
        {/*<Button className="editable-add-btn" onClick={this.handleAdd}>添加</Button> */}
        <Table bordered dataSource={user.dataFilter} columns={columns} />

      </div>
    );
  }
}

export default EditableTable;


