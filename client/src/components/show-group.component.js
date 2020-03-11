import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { Button, Image } from 'react-bootstrap';
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import Moment from 'react-moment';
import { useSelector } from "react-redux";
import { API_URL } from "../config";

function ShowGroup() {
  const [state, setState] = useState({
    title: '',
    description: '',
    address: '',
    map_src: '',
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

  const [emails, setEmails] = useState({
    email: '',
    emails: [{address: ''}]
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
          map_src: response.data.map_src,
          start_at: new Date(response.data.start_at),
          end_at: new Date(response.data.end_at),
          people: response.data.people,
          is_private: response.data.is_private,
          organizer_id: response.data.organizer_id
        })
        axios.get(API_URL+"/users/")
          .then(res => {
            if (res.data.length > 0){
              let user_ids = response.data.user_ids
              user_ids.push(response.data.organizer_id)
              user_ids = user_ids.filter(function (x, i, self) {
                return self.indexOf(x) === i;
              });
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
    if (action === 'join'){
      new_user_ids = users.user_ids.concat(loginuser.login_user_id)
    }else if(action === 'leave'){
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
      map_src: state.map_src,
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
    if (auth.user.id === props.user._id){
      return (
        <div>
          <Link to={"/users/"+ props.user._id}>
            <Image src={url} roundedCircle className="mb-3" />
            <p>{props.user.name}</p>
          </Link>
          <Button className="btn-undo" onClick={(e) => handleClick('leave', e)}>Leave</Button> 
        </div>
      )
    }else{
      return (
        <div>
          <Link to={"/users/"+ props.user._id}>
            <Image src={url} roundedCircle className="mb-3" />
            <p>{props.user.name}</p>
          </Link>
        </div>
      )
    }
  }

  const GroupTitle = () => {
    if (state.organizer_id === auth.user.id){
      return (
        <div>
          <h3>{state.title}</h3>
          <Link to={"/edit/"+ params.id}>edit</Link>
        </div>
      )
    }else{
      return <h3>{state.title}</h3>
    }
  }

  const handleEmailChange = (idx, e) => {
    const newEmails = emails.emails.map((email, eidx) => {
      if(idx !== eidx) return email;
      return {...email, address: e.target.value};
    });
    setEmails({emails: newEmails});
  };

  const handleSubmit = e => {
    e.preventDefault();
    const new_emails = emails.emails
    const message = '<p>Please join the study group from <a href=' + window.location.href + '>here</a></p>'
    axios.post(API_URL+"/send-email", {emails: new_emails, message: message})
     .then(res => console.log(res.data));
    window.location.reload();
  }

  const handleAddEmail = () => {
    setEmails({
      emails: emails.emails.concat([{address: ""}])
    });
  };

  function handleRemoveEmail(idx,e){
    setEmails({...state, emails: emails.emails.filter((e, eidx) => idx !== eidx)
    });
  };

  const JoinButton = () => {
    if (Object.keys(auth.user).length > 0 && !isOrganizer){
      return <Button className="mb-2 btn-commit" onClick={(e) => handleClick('join', e)}>Join</Button>
    }else{
      return null;
    }
  }

  const isOrganizer = (state.organizer_id === auth.user.id)

  return (
    <div className="content">
      <div className="mb-4">
        <GroupTitle />
        <Moment format="YYYY/MM/DD HH:mm">{state.start_at}</Moment> ~ 
        <Moment format="YYYY/MM/DD HH:mm">{state.end_at}</Moment>
        @{state.address}
      </div>
      <div className="mb-4">
        <h4>Detail</h4>
        <p>{state.description}</p>
      </div>
      <p className="mb-4">Limit number: {state.people} people</p>
      {isOrganizer && 
        <div className="mb-4">
          <h4>Invitation</h4>
          <form onSubmit={handleSubmit}>
            {emails.emails.map((email, idx) => (
              <div className="mb-2">
                <input type="text"
                      value={email.address}
                      onChange={(e) => handleEmailChange(idx, e)}
                      className="mr-2"
                />
                <FaTrashAlt onClick={(e) => handleRemoveEmail(idx, e)} />
              </div>
            ))}
            <FaPlus onClick={handleAddEmail} />
            <div className="mt-2">
              <Button type="submit" className="btn-commit">Send</Button>
            </div>
          </form>
        </div>
      }
      <h4>Study Buddies</h4>
      <div className="user-container mb-4">
        <UserList />
      </div>
      <JoinButton />
      <div>
        <iframe src={state.map_src} width="600" height="450" frameBorder="0" allowFullScreen=""></iframe>
      </div>
    </div>
  );
}

export default ShowGroup
