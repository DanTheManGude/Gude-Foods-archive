"use es6";

import PropTypes from "prop-types";
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Logout from "./Logout";
import Home from "./routes/Home";
import Admin from "./routes/Admin";
import NotFound from "./routes/NotFound";

export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route
          exact
          path="/home"
          render={() => <Home user={this.props.user} />}
        />
        <Redirect exact from="/" to="/home" />
        <Route exact path="/admin" component={Admin} />

        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    );
  }
}

Routes.propTypes = {
  user: PropTypes.object
};
