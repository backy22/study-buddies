import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { API_URL } from "../config";

const User = props => {
  var gravatar = require('gravatar');
  var url = gravatar.url(props.user.email);
  return (
    <div>
      <Link to={"/users/"+props.user._id}>
        <Image src={url} roundedCircle className="mr-3 mb-3" />
        {props.user.name}
      </Link>
    </div>
  )
}

class ShowGroup extends Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      title: '',
      description: '',
      address: '',
      start_at: new Date(),
      end_at: new Date(),
      people: 0,
      is_private: false,
      organizer_id: '',
      user_ids: [],
      users: [],
      new_user_id: ''
    }
  }

  componentDidMount(){
    axios.get(API_URL+"/groups/"+this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          address: response.data.address,
          start_at: new Date(response.data.start_at),
          end_at: new Date(response.data.end_at),
          people: response.data.people,
          is_private: response.data.is_private,
          organizer_id: response.data.organizer_id,
          user_ids: response.data.user_ids
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    const user = this.props.auth.user
    this.setState({
      new_user_id: user.id
    })

  }

  handleClick() {
    var new_user_ids = this.state.user_ids.concat(this.state.new_user_id)

    this.setState({
      user_ids: new_user_ids
    });

    const group = {
      title: this.state.title,
      description: this.state.description,
      address: this.state.address,
      start_at: this.state.start_at,
      end_at: this.state.end_at,
      people: this.state.people,
      is_private: this.state.is_private,
      organizer_id: this.state.organizer_id,
      user_ids: new_user_ids
    }

    axios.post(API_URL+"/groups/update/"+this.props.match.params.id, group)
      .then(res => console.log(res.data));

  }

  userList() {
    axios.get(API_URL+"/users/")
      .then(response => {
        if (response.data.length > 0){
          this.setState({
            users: response.data.filter(user => this.state.user_ids.includes(user._id))
          })
        }
      })
    return this.state.users.map(currentuser => {
      return <User user={currentuser}  />;
    })
  }

  groupTitle() {
    if (this.state.organizer_id == this.props.auth.user.id){
      return <h3>{this.state.title}<Link to={"/edit/"+this.props.match.params.id}>edit</Link></h3>
    }else{
      return <h3>{this.state.title}</h3>
    }
  }

  render() {
    return (
    <div>
      {this.groupTitle()}
      <Moment format="YYYY/MM/DD HH:mm">{this.state.start_at}</Moment> ~ 
      <Moment format="YYYY/MM/DD HH:mm">{this.state.end_at}</Moment>
      @{this.state.address}
      <p>{this.state.description}</p>
      <p>Limit number: {this.state.people} people</p>
      <h4>Study Buddies</h4>
      {this.userList()}
      <Button onClick={this.handleClick}>Join</Button>
    </div>
    );
  }
}

ShowGroup.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(ShowGroup);
