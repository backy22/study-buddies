import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { API_URL } from "../config";

function Register(props) {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/");
    }
  },[])

  const onChangeName = e => {
    setState({...state, name: e.target.value});
  }

  const onChangeEmail = e => {
    setState({...state, email: e.target.value});
  }

  const onChangePassword = e => {
    setState({...state, password: e.target.value});
  }

  const onChangePassword2 = e => {
    setState({...state, password2: e.target.value});
  }

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2
    }

  console.log(user)
  axios.post(API_URL+"/users/register", user)
    .then(res => props.history.push("/login"))
    .catch(err => console.log(err))
  }

  return (
    <div className="content">
      <h3>Register</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text"
                        required
                        value={state.name}
                        onChange={onChangeName}
                        placeholder="Enter name" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email"
                        required
                        value={state.email}
                        onChange={onChangeEmail}
                        placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" 
                        required
                        value={state.password}
                        onChange={onChangePassword}
                        placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
                        required
                        value={state.password2}
                        onChange={onChangePassword2}
                        placeholder="Confirm Password" />
        </Form.Group>
        <Link to="../login">Already registered?</Link>
        <br />
        <Button className="btn-commit mt-3" type="submit">
          Register
        </Button>
      </Form>
    </div>
  )
}

export default Register
