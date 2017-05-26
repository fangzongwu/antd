"use sti"

import React from "react";
import {observable, action, runInAction } from "mobx";

class User {
    @observable data = {
        dataSource: []
        };
    @action create(url, data) {
        fetch(url, data).then( function(response) {
            return response.json();
        }).then( function(jsonData) {
            console.log(jsonData);
        }).catch( function() {
            console.log("出错啦");
        })
    };
    @action fetchDataFromUrl() {
        let _this = this;
        fetch("http://localhost:8001/allinfo").then( function(response) {
            return response.json();
            }).then( function(jsonData) {
                _this.data.dataSource.push({
                    key: jsonData._id,
                    name: jsonData.name,
                    age: jsonData.age,
                    address: jsonData.address
                })
                console.log(_this.data.dataSource.slice());
            }).catch( function(){
                console.log("出错啦");
        })

    }
}
        

const user = new User();
export default user;
