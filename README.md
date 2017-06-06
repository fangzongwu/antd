mobx-react-antd
=====================

A minimal application that combines [MobX](https://mobxjs.github.io/mobx) with [React](https://facebook.github.io/react) and [Ant Design](https://ant.design/index-cn).
Supports ES6 and JSX compilation through babel.

* the application has 'add delete change search'.

### Run the example

```
npm install
npm start
open http://localhost:3000
```


### mobx + react + antd 

* 一个用mobx react antd 实现的具有增、删、改、查等功能的表格，其中还包括登录验证功能.
* 用react-router实现路由；
* 用antd实现UI部分；
* 用mobx进行状态管理；

### 注意事项：
* antd的css样式正常显示: npm install babel-plugin-import --save-dev; 然后在.babelrc中的"plugins"添加 ["import", { "libraryName": "antd", "style": "css" }](详见https://ant.design/docs/react/getting-started-cn)。
* 配置ansy await：
npm install babel-polyfill --save-dev;在webpack.config.js中进行配置，在entry中添加 "babel-polyfill";
* 一般是在componentDidMount中进行ajax数据调取；