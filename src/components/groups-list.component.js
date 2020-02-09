import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const Group = props => (
  <li>
    {props.group.start_at} ~ {props.group.end_at}
    {props.group.address}
    {props.group.title}
    <Link to={"/show/"+props.group._id}>show</Link> | <a href="#" onClick={() => { props.deleteGroup(props.group._id) }}>delete</a>
  </li>
)

export default class GroupsList extends Component {
  constructor(props){
    super(props);

    this.deleteGroup = this.deleteGroup.bind(this);
    this.state = {groups: []};
  }

  componentDidMount(){
    axios.get('http://localhost:5000/groups/')
      .then(response => {
        this.setState({ groups: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteGroup(id) {
    axios.delete('http://localhost:5000/groups/'+id)
      .then(response => { console.log(response.data)});
      
    this.setState({
      groups: this.state.groups.filter(el => el._id !== id)
    })
  }

  groupList(){
    return this.state.groups.map(currentgroup => {
      return <Group group={currentgroup} deleteGroup={this.deleteGroup} key={currentgroup._id} />;
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
