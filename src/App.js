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
  return (
    <Router>
      <div className="App">
        <header className="App-header">
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
