import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../config";

const User = props => (
  <tr>
    <td><Link to={"/users/"+props.user._id}>{props.user.name}</Link></td>
    <td>{props.user.title}</td>
    <td>{props.user.area}</td>
    <td>{props.user.subjects}</td>
  </tr>
)

export default class UsersList extends Component {
  constructor(props){
    super(props);

    this.deleteUser = this.deleteUser.bind(this);
    this.state = {users: []};
  }

  componentDidMount(){
    axios.get(API_URL+"/users/")
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteUser(id) {
    axios.delete(API_URL+"/users/"+id)
      .then(response => { console.log(response.data)});
      
    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }

  userList(){
    return this.state.users.map(currentuser => {
      return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Users</h3>
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
            { this.userList() }
          </tbody>
        </table>
      </div>
    )
  }
}
