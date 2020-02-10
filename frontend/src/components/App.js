"use es6";

import React, { Component } from "react";
import { Routes } from "./Routes.js";
import { Link } from "react-router-dom";
import { firebase } from "../index.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  signInGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(function(error) {
        console.log("Error " + error.code + ": " + error.message);
      });
  };

  render() {
    const { user } = this.state;
    return (
      <div id="app">
        <button onClick={this.signInGoogle} className="signinButton">
          <img
            className="sigininImage"
            src="/media/google.png"
            alt="Google Login"
          />
        </button>
        <ul>
          <Link to="/logout">
            <li>Logout</li>
          </Link>
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="/admin">
            <li>Admin</li>
          </Link>
          <Routes user={user} />
        </ul>
      </div>
    );
  }
}

export default App;
