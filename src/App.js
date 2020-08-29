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
  let logout = event => {
    event.preventDefault();
    window.localStorage.removeItem("token");
    window.location = "/login";
  }
  return (
    <Router>
      <div className="App">
        <header className="App-header">         
          {token && <div><span>Zalogowany jako {}</span><a href={"#"} onClick={logout}>Wyloguj się</a></div>}     
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
