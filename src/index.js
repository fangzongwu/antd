import DevTool from "mobx-react-devtools";

import React from "react";
import {render} from "react-dom";
import {Router, browserHistory} from "react-router";
import routes from './router';

let root = document.getElementById("root");
render(<div>
		<Router history={browserHistory} routes={routes} />
		<DevTool />
	</div>, root);
