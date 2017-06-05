import React from "react";
import { render } from "react-dom";
import { Router, browserHistory, Route } from "react-router";
import DevTools from "mobx-react-devtools";
import routes from "./routes";


render(<div>
	<Router routes={routes} history={browserHistory} />
	<DevTools />
</div>, document.getElementById("root"));
