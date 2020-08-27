import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './Login.css'

class Login extends Component {

  handleSubmit = event => {
    event.preventDefault();
    this.loginUser(event.target.username.value, event.target.password.value);
  }

  loginUser = (username, password) => {
    fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            })
          }).then(function(response) {
            if (response.status === 200) {
              console.log("You have logged in");
            } else if (response.status === 401) {
                console.log("Wrong username or password");
            } else {
                console.log("Something went wrong.");
            }
          }).catch(function(error){
            console.log("Error", "Something went wrong.");
          });  
  }

  registerMethod = event => {
    event.preventDefault();
    console.log("Siema");
  } 

  render() {
    return (
      <>
      <div className="login">
          <h3>
              <span className="font-weight-bold">social-network.herokuapp</span>.com
          </h3>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <div className='username'>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" placeholder="Username"/>
            </Form.Group>
          </div>
          <div className='password'>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" />
            </Form.Group>
          </div>
            <Button className="btn-lg btn-block mt-3 mb-3" type="submit">Login</Button>
          <div className="text-register text-center pt-3">
              Don't have an account? Sign up.
          </div>
            <Button className="btn btn-success btn-block mt-3 mb-3" onClick={this.registerMethod}>
              Register
            </Button>
        </Form>
      </div>
      </>
    );
  }
}

export default Login;