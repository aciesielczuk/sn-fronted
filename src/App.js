import React, {Component} from 'react';
import Login from './Login.js';
import './App.css';

class App extends Component {
  render() {
   return <div className="App">
      <header className="App-header">
        <Login/>
      </header>
    </div>
  }
}

export default App;
