import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { API_URL } from "../config";

const Group = props => {
  if (props.group.organizer_id == props.user.id){ 
    return(
      <li>
        {props.group.start_at} ~ {props.group.end_at}
        {props.group.address}
        {props.group.title}
        <Link to={"/show/"+props.group._id}>show</Link> | <a href="#" onClick={() => { props.deleteGroup(props.group._id) }}>delete</a>
      </li>
    );
  }else{
    return(
      <li>
        {props.group.start_at} ~ {props.group.end_at}
        {props.group.address}
        {props.group.title}
        <Link to={"/show/"+props.group._id}>show</Link>
      </li>
    );
  }
}

class GroupsList extends Component {
  constructor(props){
    super(props);

    this.deleteGroup = this.deleteGroup.bind(this);
    this.state = {groups: []};
  }

  componentDidMount(){
    axios.get(API_URL+"/groups/")
      .then(response => {
        this.setState({ groups: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteGroup(id) {
    axios.delete(API_URL+"/groups/"+id)
      .then(response => { console.log(response.data)});
      
    this.setState({
      groups: this.state.groups.filter(el => el._id !== id)
    })
  }

  groupList(){
    return this.state.groups.map(currentgroup => {
      return <Group group={currentgroup} deleteGroup={this.deleteGroup} key={currentgroup._id} user={this.props.auth.user}/>;
    })
  }

  render() {
    return (
      <div>
        <ul>
          { this.groupList() }
        </ul>
      </div>
    )
  }
}

GroupsList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(GroupsList);
