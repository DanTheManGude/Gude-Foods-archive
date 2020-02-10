import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, content: null };
  }

  render() {
    return (
      <div id="Home">
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
