import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/homePage/HomePage";
import PageNotFound from "./PageNotFound";
import BrowseByCategory from "./home/browseByCategory/BrowseByCategory";

function App() {
  return (
    <div className="container-fluid">
      <BrowseByCategory />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
