import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './Registration.css'

class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      errors: {
        username: '',
        password: '',
      }
    };
  }
  
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'username': 
        errors.username = 
          value.trim().length < 5
            ? 'Username must be 5 characters long!'
            : '';
        break;
      case 'password': 
        errors.password = 
          value.trim().length < 5
            ? 'Password must be 5 characters long!'
            : '';
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value});
  }

  handleSubmit = event =>  {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
      console.log(event.target.username.value);
      console.log(event.target.password.value);
      this.registerUser(event.target.username.value, event.target.password.value);
    }else{
      console.error('Invalid Form')
    }
    
  }

  registerUser(username, password) {
    fetch('http://localhost:8080/users', {
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
              console.log("User registered!");
            } else {
              console.log("User not registered!");
            }
          }).catch(function(error){
            console.log("Error!");
          });  
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="Register">
        <Form onSubmit={this.handleSubmit}>
          <div className='username'>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" placeholder="Username" onChange={this.handleChange} noValidate />
                {errors.username.length > 0 && 
                <span className='error'>{errors.username}</span>}
            </Form.Group>
          </div>
          <div className='password'>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} noValidate />
                {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
            </Form.Group>
          </div>
          <div className='submit'>
            <Button type="submit">Register</Button>
          </div>
        </Form>
      </div>
    );
  }
}

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export default Registration;