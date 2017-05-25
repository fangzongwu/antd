import React from "react";
import {observable, autorun} from "mobx";

const dataSource = observable([{
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      }, {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      }]);

export default dataSource;
// autorun( function() {dataSource.map(data => {
//     data.age = '54'
// })}) 