"use es6";

import React from "react";
import { Redirect } from "react-router-dom";
import { firebase } from "../index.js";

export default function Logout() {
  firebase.auth().signOut();
  return (
    <div id="logout">
      <Redirect to="/" />
    </div>
  );
}
