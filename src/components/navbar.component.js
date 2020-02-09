import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Button } from 'react-bootstrap';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const auth = this.props.auth;

    const NavContent = props => {
      if (props.auth.isAuthenticated) {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Study Groups</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">Create Group</Link>
          </li>
          <li className="navbar-item">
            <Link to="/users" className="nav-link">Study Buddies</Link>
          </li> 
          <li className="navbar-item">
            <Link to={"/edit/users/"+props.auth.user.id} className="nav-link">Profile</Link>
          </li>
          <li className="navbar-item">
            <Button variant="link" onClick={this.onLogoutClick}>Logout</Button>
          </li>
        </ul>
      );
      }else{
        return (
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Study Groups</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Group</Link>
            </li>
            <li className="navbar-item">
              <Link to="/users" className="nav-link">Study Buddies</Link>
            </li> 
            <li className="navbar-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </ul>
        );
      }
    }

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Study Buddies</Link>
        <div className="collpase navbar-collapse">
          <NavContent auth={auth}/>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
