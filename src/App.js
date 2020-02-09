import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import $ from "jquery";
import './datetime.css';

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/navbar.component"
import GroupsList from "./components/groups-list.component";
import EditGroup from "./components/edit-group.component";
import ShowGroup from "./components/show-group.component";
import CreateGroup from "./components/create-group.component";
import EditUser from "./components/edit-user.component";
import UsersList from "./components/users-list.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import ShowUser from "./components/show-user.component";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Navbar />
          <br/>
          <Route path="/" exact component={GroupsList} />
          <Route path="/edit/:id" exact component={EditGroup} />
          <Route path="/show/:id" component={ShowGroup} />
          <Route path="/create" component={CreateGroup} />
          <Route path="/users" exact component={UsersList} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/edit/users/:id" component={EditUser} />
          <Route path="/users/:id" component={ShowUser} />
          </div>
      </Router>
    </Provider>
  );
}

export default App;
