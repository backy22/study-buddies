import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from "react-router";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../config";

function EditUser() {
  const [state, setState] = useState({
    name: '',
    title: '',
    area: '',
    age: '',
    email: '',
    introduction: '',
    goal: [],
    subjects: []
  });

  const auth = useSelector(state => state.auth);
  let params = useParams();

  useEffect(() => {
    axios.get(API_URL+"/users/"+auth.user.id)
      .then(response => {
        setState({
          name: response.data.name,
          title: response.data.title,
          area: response.data.area,
          age: response.data.age,
          email: response.data.email,
          introduction: response.data.introduction,
          goal: response.data.goal,
          subjects: response.data.subjects
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  },[]);

  const onChangeName = e => {
    setState({...state, name: e.target.value});
  }

  const onChangeEmail = e => {
    setState({...state, email: e.target.value});
  }

  const onChangeTitle = e => {
    setState({...state, title: e.target.value});
  }

  const onChangeArea = e => {
    setState({...state, area: e.target.value});
  }

  const onChangeAge = e => {
    setState({...state, age: e.target.value});
  }

  const onChangeIntroduction = e => {
    setState({...state, introduction: e.target.value});
  }

  const onChangeGoal = e => {
    setState({...state, goal: e.target.value});
  }

  const onChangeSubjects = subjects => {
    setState({...state, subjects});
  }

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      name: state.name,
      title: state.title,
      area: state.area,
      age: state.age,
      email: state.email,
      introduction: state.introduction,
      goal: state.goal,
      subjects: state.subjects
    }

    axios.post(API_URL+"/users/update/"+ params.id, user)
      .then(res => console.log(res.data));
  }

  var gravatar = require('gravatar');
  var url = gravatar.url(state.email);

  return (
    <div>
      <h3>Edit Profile</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Handlename: </label>
          <input  type="text"
              required
              className="form-control"
              value={state.name}
              onChange={onChangeName}
              />
        </div>
        <div className="form-group"> 
          <label>Email: </label>
          <input  type="text"
              required
              className="form-control"
              value={state.email}
              onChange={onChangeEmail}
              />
        </div>
        <div className="mb-1">
          <div><Image src={url} roundedCircle /></div>
          <small>※If you want to change image, please upload from <a href="https://en.gravatar.com/emails/" target="blank">here.</a></small>
        </div>
        <div className="form-group"> 
          <label>Subjects: </label>
          <TagsInput
              className="form-control"
              value={state.subjects}
              onChange={onChangeSubjects}
              />
        </div>
        <div className="form-group"> 
          <label>Goal: </label>
          <input type="text"
              className="form-control"
              value={state.goal}
              onChange={onChangeGoal}
              />
        </div>
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
          <label>Area: </label>
          <input  type="text"
              required
              className="form-control"
              value={state.area}
              onChange={onChangeArea}
              />
        </div>
        <div className="form-group"> 
          <label>Age: </label>
          <input  type="number"
              required
              className="form-control"
              value={state.age}
              onChange={onChangeAge}
              />
        </div>
        <div className="form-group"> 
          <label>Introduction: </label>
          <input  type="text"
              required
              className="form-control"
              value={state.introduction}
              onChange={onChangeIntroduction}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Update User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default EditUser
