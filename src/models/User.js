"use sti"

import React from "react";
import {observable, action, runInAction, autorun, computed } from "mobx";

class User {
    @observable data = {
        dataSource: []
        };
    @observable filter = "";
    @computed get dataFilter() {
        var matchesFilter = new RegExp(this.filter, "i");
        return this.data.dataSource.filter(todo => !this.filter || matchesFilter.test(todo.name));
    }

    @action create(url, data) {
        fetch(url, data).then( function(response) {
            return response.json();
        }).then( function(jsonData) {
           // console.log(jsonData);
        }).catch( function() {
            console.log("出错啦");
        })
    };
    @action async fetchDataFromUrl() {
        const ret = await fetch("http://localhost:8001/allinfo").then( function(response) {
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

}
        

const user = new User();
export default user;
