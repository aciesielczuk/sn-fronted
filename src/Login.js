import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link} from "react-router-dom"

import './Login.css'

export default function Login() {

  let loginUser = (username, password) => {
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
          }).then(res => res.json())
            .then(response => {
            if (response.token) {
              window.localStorage.setItem('token', response.token);
              window.location = '/posts';
            } else if (response.status === 401) {
                console.log("Wrong username or password");
            } else {
                console.log("Something went wrong.");
            }
          }).catch(function(error){
            console.log(error);
          });  
  }

  let handleSubmit = event => {
    event.preventDefault();
    loginUser(event.target.username.value, event.target.password.value);
  }

    return (
      <>
      <div className="login">
          <h3>
              <span className="font-weight-bold">social-network.herokuapp</span>.com
          </h3>
        <Form className="login-form" onSubmit={handleSubmit}>
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
            <Button className="btn btn-success btn-block mt-3 mb-3">
              <Link to="/register">Register</Link>
            </Button>
        </Form>
      </div>
      </>
    );
  }
