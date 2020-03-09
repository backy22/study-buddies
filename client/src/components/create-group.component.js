import React, { useState } from 'react';
import axios from 'axios'; 
import * as Datetime from 'react-datetime';
import { useSelector } from "react-redux";
import { API_URL } from "../config";

function CreateGroup() {

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

  const auth = useSelector(state => state.auth);

  const onChangeTitle = e => {
    setState({...state, title: e.target.value});
  }

  const onChangeDescription = e => {
    setState({...state, description: e.target.value});
  }

  const onChangeAddress = e => {
    setState({...state, address: e.target.value});
  }

  const onChangeMapSrc = e => {
    setState({...state, map_src: e.target.value});
  }

  const onChangeStartAt = date => {
    setState({...state, start_at: date._d});
  }

  const onChangeEndAt = date => {
    setState({...state, end_at: date._d});
  }

  const onChangePeople = e => {
    setState({...state, people: e.target.value});
  }

  const onChangeIsPrivate = e => {
    setState({...state, is_private: e.target.checked});
  }

  const onSubmit = e => {
    e.preventDefault();
    const group = {
      title: state.title,
      description: state.description,
      address: state.address,
      map_src: state.map_src,
      start_at: state.start_at,
      end_at: state.end_at,
      people: state.people,
      is_private: state.is_private,
      organizer_id: auth.user.id
    }

    axios.post(API_URL+"/groups/add", group)
      .then(res => console.log(res.data));

    window.location = '/';

  }

  return (
    <div className="content">
      <h3>Create New Group</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={state.title}
              onChange={onChangeTitle}
              />
        </div>
        <div className="form-group">
          <label>DateTime: </label>
          <div>
            <Datetime
              dateTime={state.start_at}
              onChange={onChangeStartAt}
            /> ~
            <Datetime
              dateTime={state.end_at}
              onChange={onChangeEndAt}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Address: </label>
          <input  type="text"
              required
              className="form-control"
              value={state.address}
              onChange={onChangeAddress}
              />
        </div>
        <div className="form-group">
          <label>Map Source: </label>
          <input  type="text"
              required
              className="form-control"
              value={state.map_src}
              onChange={onChangeMapSrc}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={state.description}
              onChange={onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Limit number: </label>
          <input 
              type="text" 
              className="form-control"
              value={state.people}
              onChange={onChangePeople}
              />
        </div>
        <div className="form-group">
          <input type="checkbox" name="private" onChange={onChangeIsPrivate}/>
          <label for="private">Private</label>
        </div>
        <div className="form-group">
          <input type="submit" value="Create Group" className="btn btn-commit" />
        </div>
      </form>
    </div>
  )
}

export default CreateGroup
