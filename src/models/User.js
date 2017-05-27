"use sti"

import React from "react";
import {observable, action, runInAction, autorun } from "mobx";

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
    @action addList(insertOne) {
        this.data.dataSource.push(insertOne);
    }
    // @action fetchDataFromUrl() {
    //     let _this = this;
    //     var obj;
    //     fetch("http://192.168.56.1:8001/addAllInfo").then( function(response) {
    //         return response.json();
    //         }).then( function(jsonData) {  
    //            jsonData.map(j => {
    //                 obj = {
    //                     key: j._id,
    //                     name: j.name,
    //                     age: j.age,
    //                     address: j.address
    //                 }
    //                 _this.addList(obj);
                    
    //            })                          
    //         }).catch( function(){
    //             console.log("出错啦");
    //     })
    // }
    @action async fetchDataFromUrl() {
        const ret = await fetch("http://192.168.56.1:8001/addAllInfo").then( function(response) {
            return response.json();
            }).then( function(jsonData) {  
                return jsonData;                         
            }).catch( function(){
                console.log("出错啦");
        })
        ret.map()
        runInAction('update users list after fetch', () => {
          this.data = Object.assign({}, ret);
        });
    }

}
        

const user = new User();
export default user;
