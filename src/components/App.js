import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { store } from '../index.js';
import { NavBar } from './NavBar.js';
import { Banner } from './Banner.js';
import { Home } from './Home.js';
import { Edit } from './Edit.js';
import { config } from '../config.js';
export var firebase = require("firebase");

export function GoogleLogin(){
    //Google login
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var message = "Successfully logged in. Welcome " + result.user.email;
        store.dispatch({
            type: 'ADD_BANNER',
            message: message,
            'kind': 'alert-success'
        });
        store.dispatch({
            type: 'UPDATE_USER',
            user: result.user.email
        });
    }).catch(function(error) {
        store.dispatch({
            type: 'ADD_BANNER',
            message: "Something went wrong trying to login.",
            'kind': 'alert-danger'
        });
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error " + errorCode + ": " + errorMessage);
    });
}
class App extends Component {
  constructor(props) {
    super(props);

    // Initialize Firebase
    firebase.initializeApp(config);
  }

  render() {
    return (
      <div className="App">
        <NavBar />

        {/*main body of the page*/}
        <div className="container default">
          <div className="row">
            <div className="col-lg-12 intro">
              <h2 id="title" className="mt-5">Gude Foods</h2>
              <Banner />
              <Switch>
                  <Route exact path='/Gude-Foods/home' component={Home}/>
                  <Route exact path='/Gude-Foods/edit' component={Edit}/>
                  <Route path='/Gude-Foods/' render={() => (<Redirect to="/Gude-Foods/home"/>)}/>
                  <Route path='/' render={() => (<Redirect to="/Gude-Foods/"/>)}/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
