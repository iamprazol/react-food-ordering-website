import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/homePage/HomePage";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
