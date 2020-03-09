import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from "../config";

function UsersList() {
  const [state, setState] = useState({
    users: []
  });

  useEffect(() => {
    axios.get(API_URL+"/users/")
      .then(response => {
        setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  },[]);

  const User = props => {
    var gravatar = require('gravatar');
    var url = gravatar.url(props.user.email);
    return (
      <tr>
        <td><Link to={"/users/"+props.user._id}><Image src={url} roundedCircle className="mr-3"/>{props.user.name}</Link></td>
        <td>{props.user.title}</td>
        <td>{props.user.area}</td>
        <td>{props.user.subjects.join(',')}</td>
      </tr>
    )
  }

  const UserList = () => {
    return state.users.map(currentuser => {
      return <User user={currentuser} key={currentuser._id} />;
    })
  }

  return (
    <div>
      <h3>Study Buddies</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Title</th>
            <th>Area</th>
            <th>Subjects</th>
          </tr>
        </thead>
        <tbody>
          <UserList />
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
