"use es6";

import React, { Component } from "react";
import API from "../../utils/API";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, content: null };
  }

  componentDidMount() {
    API.get("revision")
      .then(response => {
        this.setState({ loading: false, content: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { loading, content } = this.state;
    if (loading) {
      return null;
    }

    return (
      <div id="Admin">
        <h1>Admin</h1>
        {JSON.stringify(content)}
      </div>
    );
  }
}

export default Admin;
