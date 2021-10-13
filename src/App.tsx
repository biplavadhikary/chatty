import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import "./App.css";
import routes from "./routes";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          {routes.map(({ id, component, path, exact }) => (
            <Route key={id} exact={exact} path={path} component={component} />
          ))}
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
