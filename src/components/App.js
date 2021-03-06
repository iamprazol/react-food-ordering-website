// Import Libraries.
import React from "react";
import { Route, Switch } from "react-router-dom";

// Import Components.
import HomePage from "./home/homePage/HomePage";
import PageNotFound from "./pageNotFound/PageNotFound";
import RestaurantLayout from "./restaurantPage/restaurantLayout/RestaurantLayout";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/restaurant/:restaurantId" component={RestaurantLayout} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
