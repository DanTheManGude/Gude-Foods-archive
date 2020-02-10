import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Home from "./routes/Home.js";
import Admin from "./routes/Admin.js";
import NotFound from "./routes/NotFound.js";

export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/home" component={() => <Home />} />
        <Redirect exact from="/" to="/home" />
        <Route exact path="/admin" component={() => <Admin />} />

        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    );
  }
}
