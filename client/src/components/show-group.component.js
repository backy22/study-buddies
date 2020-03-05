import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { Button, Image } from 'react-bootstrap';
import Moment from 'react-moment';
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../config";

function ShowGroup() {
  const [state, setState] = useState({
    title: '',
    description: '',
    address: '',
    start_at: new Date(),
    end_at: new Date(),
    people: 0,
    is_private: false,
    organizer_id: ''
  });

  const [users, setUsers] = useState({
    users: [],
    user_ids: []
  });

  const [loginuser, setLoginUser] = useState({
    login_user_id: ''
  });

  const auth = useSelector(state => state.auth);
  let params = useParams();

  useEffect(() => {
    axios.get(API_URL+"/groups/"+ params.id)
      .then(response => {
        setState({
          ...state,
          title: response.data.title,
          description: response.data.description,
          address: response.data.address,
          start_at: new Date(response.data.start_at),
          end_at: new Date(response.data.end_at),
          people: response.data.people,
          is_private: response.data.is_private,
          organizer_id: response.data.organizer_id
        })
        axios.get(API_URL+"/users/")
          .then(res => {
            if (res.data.length > 0){
              setUsers({user_ids: response.data.user_ids, users: res.data.filter(user => response.data.user_ids.includes(user._id))})
            }
          })
        .catch(function (error) {
          console.log(error);
        })
        setLoginUser({...loginuser, login_user_id: auth.user.id})
      })
      .catch(function (error) {
        console.log(error);
      })

  },[]);


  function handleClick(action) {
    let new_user_ids;
    if (action == 'join'){
      new_user_ids = users.user_ids.concat(loginuser.login_user_id)
    }else if(action == 'leave'){
      new_user_ids = users.user_ids.filter(item => item !== loginuser.login_user_id)
    }else{
      return;
    }
    axios.get(API_URL+"/users/")
      .then(res => {
        if (res.data.length > 0){
          setUsers({user_ids: new_user_ids, users: res.data.filter(user => new_user_ids.includes(user._id))})
          }
        })
      .catch(function (error) {
        console.log(error);
      })

    const group = {
      title: state.title,
      description: state.description,
      address: state.address,
      start_at: state.start_at,
      end_at: state.end_at,
      people: state.people,
      is_private: state.is_private,
      organizer_id: state.organizer_id,
      user_ids: new_user_ids
    }

    axios.post(API_URL+"/groups/update/"+ params.id, group)
      .then(res => console.log(res.data));
  }

  const UserList = () => {
    return users.users.map(currentuser => {
      return <User user={currentuser}  />;
    })
  }

 const User = props => {
    var gravatar = require('gravatar');
    var url = gravatar.url(props.user.email);
    if (auth.user.id == props.user._id){
      return (
        <div>
        <Link to={"/users/"+ props.user._id}>
        <Image src={url} roundedCircle className="mr-3 mb-3" />
        {props.user.name}
        </Link>
        <Button variant="danger" onClick={(e) => handleClick('leave', e)}>Leave</Button> 
        </div>
      )
    }else{
      return (
        <div>
        <Link to={"/users/"+ props.user._id}>
        <Image src={url} roundedCircle className="mr-3 mb-3" />
        {props.user.name}
        </Link>
        </div>
      )
    }
  }

  const GroupTitle = () => {
    if (state.organizer_id == auth.user.id){
      return <h3>{state.title}<Link to={"/edit/"+ params.id}>edit</Link></h3>
    }else{
      return <h3>{state.title}</h3>
    }
  }

  const JoinButton = () => {
    if (Object.keys(auth.user).length > 0){
      return <Button onClick={(e) => handleClick('join', e)}>Join</Button>
    }else{
      return null;
    }
  }

  return (
    <div>
      <GroupTitle />
      <Moment format="YYYY/MM/DD HH:mm">{state.start_at}</Moment> ~ 
      <Moment format="YYYY/MM/DD HH:mm">{state.end_at}</Moment>
      @{state.address}
      <p>{state.description}</p>
      <p>Limit number: {state.people} people</p>
      <h4>Study Buddies</h4>
      <UserList />
      <JoinButton />
    </div>
  );
}

export default ShowGroup
