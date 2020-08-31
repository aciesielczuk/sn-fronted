import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login.js';
import Registration from './Registration.js';
import Posts from './Posts.js';

import './App.css';

export default function App() {
  let token = window.localStorage.getItem("token");
  let username = window.localStorage.getItem("username");
  let logout = event => {
    event.preventDefault();
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    window.location = "/login";
  }
  return (
    <Router>
      <div className="App">
        <header className="App-header">         
          {token && <div><span>Hello! {username} </span><a href={"/#"} onClick={logout}>Log out</a></div>}     
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
        </header>
      </div>
    </Router>
  );
}
