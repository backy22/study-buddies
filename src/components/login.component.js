import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor(props){
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(user); 

  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h3>Login</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"
                          required
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          placeholder="Enter email"
                          className={classnames("", {
                            invalid: errors.email || errors.emailnotfound
                          })}
                          />
          </Form.Group>
          <label htmlFor="email">Email</label>
          <span className="red-text">
            {errors.email}
            {errors.emailnotfound}
          </span>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
                          required
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
