"use es6";

import PropTypes from "prop-types";
import React, { Component } from "react";

class Home extends Component {
  getLoginMessage = () => {
    const { user } = this.props;

    return user ? `Welcome ${user.email}` : "You are not logged in";
  };

  render() {
    return (
      <div id="Home">
        <h1>Home</h1>
        {this.getLoginMessage()}
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object
};

export default Home;
