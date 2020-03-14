import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from "../img/logo.svg";

import GroupsList from "./groups-list.component";
import EditGroup from "./edit-group.component";
import ShowGroup from "./show-group.component";
import CreateGroup from "./create-group.component";
import EditUser from "./edit-user.component";
import UsersList from "./users-list.component";
import Login from "./login.component";
import Register from "./register.component";
import ShowUser from "./show-user.component";

class Header extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const auth = this.props.auth;
    const NavContent = props => {
      if (props.auth.isAuthenticated) {
        return (
          <Nav className="mr-auto">
            <Nav.Link href="/">Study Group</Nav.Link>
            <Nav.Link href="/create">Create Group</Nav.Link>
            <Nav.Link href="/users">Study Buddies</Nav.Link>
            <Nav.Link href={"/edit/users/"+props.auth.user.id}>Profile</Nav.Link>
            <Nav.Link onClick={this.onLogoutClick}>Logout</Nav.Link>
          </Nav>
        );
      }else{
        return (
          <Nav className="mr-auto">
            <Nav.Link href="/">Study Group</Nav.Link>
            <Nav.Link href="/users">Study Buddies</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
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

    const BurgerMenu = props => {
      if (props.auth.isAuthenticated) {
        return (
          <Navbar collapseOnSelect expand="lg" className="sp">
            <Link to="/" className="navbar-brand logo"><img src={logo} alt="logo"/></Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Study Group</Nav.Link>
                <Nav.Link href="/create">Create Group</Nav.Link>
                <Nav.Link href="/users">Study Buddies</Nav.Link>
                <Nav.Link href={"/edit/users/"+props.auth.user.id}>Profile</Nav.Link>
                <Nav.Link onClick={this.onLogoutClick}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )
      }else{
        return (
          <Navbar collapseOnSelect expand="lg" className="sp">
            <Link to="/" className="navbar-brand logo"><img src={logo} alt="logo"/></Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Study Group</Nav.Link>
                <Nav.Link href="/users">Study Buddies</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )
      }
    }

    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg pc">
            <Link to="/" className="navbar-brand logo"><img src={logo} alt="logo"/></Link>
            <div className="collpase navbar-collapse">
              <NavContent auth={auth} />
            </div>
          </nav>
          <BurgerMenu auth={auth} />
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

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
