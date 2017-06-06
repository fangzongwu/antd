"use strict";

import React from "react";
import {observable, action, runInAction, computed } from "mobx";
import Cookie from "js-cookie";

class User {
    @observable data = {
        dataSource: []
        };
    @observable filter = "";
    @observable auth = {
        isAuthenticated: Cookie.get("access_name") ? true : false
    }
    @computed get dataFilter() {
        var matchesFilter = new RegExp(this.filter, "i");
        return this.data.dataSource.filter(todo => !this.filter || matchesFilter.test(todo.name) || matchesFilter.test(todo.age) || matchesFilter.test(todo.address));
    }

    @action create(url, data) {
        fetch(url, data).then( function(response) {
            return response.json();
        }).then( function(jsonData) {
           // console.log(jsonData);
            // this.fetchDataFromUrl();
        }).catch( function() {
            console.log("出错啦");
        })
        runInAction('create success', () => {
            this.fetchDataFromUrl();
        })
    };
    @action async fetchDataFromUrl() {
        const ret = await fetch("http://192.168.1.53:8001/addAllInfo").then( function(response) {
            return response.json();
            }).then( function(jsonData) {  
                return jsonData;                         
            }).catch( function(){
                console.log("出错啦");
            })
            var arr = [];
            ret.map(r => {
                arr.push({
                    key: r._id,
                    name: r.name,
                    age: r.age,
                    address: r.address
                })
            })
        runInAction('update users list after fetch', () => {
          this.data.dataSource = arr;
        });
    };
    // @action loginTo(url, data) {
    //     fetch(url, data).then( function(response) {
    //         return response.json();
    //     }).then( function(jsonData) {
    //         if (jsonData == -1){
    //             console.log("没有该账户");
    //             return;
    //         }else{
    //             console.log(jsonData[0].name);
    //             Cookie.set("access_name", jsonData[0].name);
    //             this.auth.isAuthenticated = true;
    //         }
    //     }).catch( function() {
    //         console.log("出错啦");
    //     })
               
    // }
    @action async loginTo(url, data) {
        const lo = await fetch(url, data).then( function(response) {
            return response.json();
            }).then( function(jsonData) {  
                return jsonData;  
                console.log(jsonData)                       
            }).catch( function(){
                console.log("出错啦");
            })

        runInAction('login success', () => {
            if(lo == -1) {
                alert("没有该账户");
                return;
            }
            Cookie.set("access_name", lo[0].name);
            this.auth.isAuthenticated = true;          
        });
    };

}
        

const user = new User();
export default user;
