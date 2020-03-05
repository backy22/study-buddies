import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router";
import * as Datetime from 'react-datetime';
import { API_URL } from "../config";

function EditGroup() {
  const [state, setState] = useState({
    title: '',
    description: '',
    address: '',
    start_at: new Date(),
    end_at: new Date(),
    people: 0,
    is_private: false,
    organizer_id: '',
    user_ids: []
  });

  let params = useParams();

  useEffect(() => {
    axios.get(API_URL+"/groups/" + params.id)
      .then(response => {
        setState({
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

    axios.get(API_URL+"/users/")
      .then(response => {
        if (response.data.length > 0){
          setState({...state, users: response.data.map(user => user.username)})
        }
      })
  },[])

  const onChangeTitle = e => {
    setState({...state, title: e.target.value});
  }

  const onChangeDescription = e => {
    setState({...state, description: e.target.value});
  }

  const onChangeAddress = e => {
    setState({...state, address: e.target.value});
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
    setState({...state, is_private: e.target.value});
  }

  const onSubmit = e => {
    e.preventDefault();

    const group = {
      title: state.title,
      description: state.description,
      address: state.address,
      start_at: state.start_at,
      end_at: state.end_at,
      people: state.people,
      is_private: state.is_private,
      organizer_id: state.organizer_id,
      user_ids: state.user_ids
    }

    axios.post(API_URL+"/groups/update/" + params.id, group)
      .then(res => console.log(res.data));

    window.location = '/';

  }

    return (
    <div>
      <h3>Edit Group</h3>
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
              value={state.start_at}
              dateTime={state.start_at}
              onChange={onChangeStartAt}
            /> ~
            <Datetime
              value={state.end_at}
              dateTime={state.end_at}
              onChange={onChangeEndAt}
            />
          </div>
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
          <input type="submit" value="Edit Group" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
}

export default EditGroup
