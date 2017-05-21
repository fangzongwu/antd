import React from "react";
import {render} from "react-dom";
import {Router, Route, hashHistory, IndexRoute, browserHistory} from "react-router";
import App from "./component/App";
import List from "./component/List";
import Home from "./component/Home";
import Login from './component/Login';
let routes = <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="login" component={Login} />
                <Route path="list" component={List} />
                <Route path="beo" component={List} />
             </Route>

render((
	<Router routes={routes} history={browserHistory}>
		
  </Router>
	), document.getElementById("root"));
