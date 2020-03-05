import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import Moment from 'react-moment';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../config";

function GroupsList() {
  const [state, setState] = useState({
      groups: []
  });

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    axios.get(API_URL+"/groups/")
      .then(response => {
        setState({ groups: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  },[]);

  const Group = props => {
    if (props.group.organizer_id == props.user.id){ 
      return(
        <ListGroup.Item>
          <Link to={"/show/"+props.group._id}>
            <Moment format="YYYY/MM/DD HH:mm">{props.group.start_at}</Moment> ~ 
            <Moment format="YYYY/MM/DD HH:mm">{props.group.end_at}</Moment>
            @{props.group.address}
            <h4>{props.group.title}</h4>
          </Link>
          <a href="#" onClick={() => { props.deleteGroup(props.group._id) }}>delete</a>
        </ListGroup.Item>
      );
    }else{
      return(
        <ListGroup.Item>
          <Link to={"/show/"+props.group._id}>
            <Moment format="YYYY/MM/DD HH:mm">{props.group.start_at}</Moment> ~ 
            <Moment format="YYYY/MM/DD HH:mm">{props.group.end_at}</Moment>
            @{props.group.address}
            <h4>{props.group.title}</h4>
          </Link>
        </ListGroup.Item>
      );
    }
  }

  function deleteGroup(id) {
    axios.delete(API_URL+"/groups/"+id)
      .then(response => { console.log(response.data)});
      
    setState({
      groups: state.groups.filter(el => el._id !== id)
    })
  }

  const GroupList = () => {
    return state.groups.map(currentgroup => {
      return <Group group={currentgroup} deleteGroup={deleteGroup} key={currentgroup._id} user={auth.user}/>;
    })
  }

  return (
    <div>
      <ListGroup>
        <GroupList />
      </ListGroup>
    </div>
  )
}

export default GroupsList
