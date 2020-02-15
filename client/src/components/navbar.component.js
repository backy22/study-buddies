import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Button } from 'react-bootstrap';

import GroupsList from "./groups-list.component";
import EditGroup from "./edit-group.component";
import ShowGroup from "./show-group.component";
import CreateGroup from "./create-group.component";
import EditUser from "./edit-user.component";
import UsersList from "./users-list.component";
import Login from "./login.component";
import Register from "./register.component";
import ShowUser from "./show-user.component";

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
            <li className={"navbar-item " + (window.location.pathname === '/' ? 'active' : '')}>
              <Link to="/" className="nav-link">Study Groups</Link>
            </li>
            <li className={"navbar-item " + (window.location.pathname === '/create' ? 'active' : '')}>
              <Link to="/create" className="nav-link">Create Group</Link>
            </li>
            <li className={"navbar-item " + (window.location.pathname === '/users' ? 'active' : '')}>
              <Link to="/users" className="nav-link">Study Buddies</Link>
            </li> 
            <li className={"navbar-item " + (window.location.pathname == '/edit/users' ? 'active' : '')}>
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
            <li className={"navbar-item " + (window.location.pathname === '/' ? 'active' : '')} >
              <Link to="/" className="nav-link">Study Groups</Link>
            </li>
            <li className={"navbar-item " + (window.location.pathname === '/users' ? 'active' : '')}>
              <Link to="/users" className="nav-link">Study Buddies</Link>
            </li> 
            <li className={"navbar-item " + (window.location.pathname === '/login' ? 'active' : '')}>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className={"navbar-item " + (window.location.pathname === '/register' ? 'active' : '')}>
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </ul>
        );
      }
    }

    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route {...rest} render={props => (this.props.auth.isAuthenticated
            ? <Component {...props} />
            : <Redirect to="/login"/>
        )}/>
      )
    }

    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">Study Buddies</Link>
            <div className="collpase navbar-collapse">
              <NavContent auth={auth}/>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={GroupsList} />
          <Route path="/edit/:id" exact component={EditGroup} />
          <Route path="/show/:id" component={ShowGroup} />
          <PrivateRoute path="/create" component={CreateGroup} />
          <Route path="/users" exact component={UsersList} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/edit/users/:id" component={EditUser} />
          <PrivateRoute path="/users/:id" component={ShowUser} />
        </div>
      </Router>
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
