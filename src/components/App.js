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

function parseFirebase(json){
  if (json === null){
      store.dispatch({
          type: 'ADD_BANNER',
          message: "No recipes!",
          'kind': 'alert-warning'
      });
      return;
  }

  store.dispatch({
      type: 'LOAD_RECIPES',
      state: json
  });
}

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize Firebase
    firebase.initializeApp(config);

    firebase.database().ref('recipes/').once('value').then(function(snapshot) {
        parseFirebase(snapshot.val());
    });
  }

  onFileSubmit(event) {
      var json;
      var file = event.target.files[0];
      if (file === null){
          store.dispatch({
              type: 'ADD_BANNER',
              message: "No file selected",
              'kind': 'alert-warning'
          });
          return;
      }
      var fileReader = new FileReader();
      fileReader.onload = (function (theFile) {
          return function(e) {
              try {
                  json = JSON.parse(e.target.result);
                  store.dispatch({
                      type: 'LOAD_RECIPES',
                      state: json
                  });
              } catch (ex) {
                  store.dispatch({
                      type: 'ADD_BANNER',
                      message: "JSON files created from this website only please!",
                      'kind': 'alert-warning'
                  });
              }
          }
      })(file);
      fileReader.readAsText(file);
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
              <input style={{display:"none"}} accept="json" className="form-control" type="file" onChange={this.onFileSubmit.bind(this)}/>
              <Switch>
                  <Route exact path='/Gude-Foods' component={Home}/>
                  <Route exact path='/Gude-Foods/edit' component={Edit}/>
                  <Route path='/' render={() => (<Redirect to="/Gude-Foods"/>)}/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
