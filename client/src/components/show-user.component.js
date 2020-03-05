import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import { API_URL } from "../config";

function ShowUser() {
  const [state, setState] = useState({
    name: '',
    title: '',
    area: '',
    age: '',
    email: '',
    introduction: '',
    goal: '',
    subjects: []
  });

  let params = useParams();

  useEffect(() => {
    axios.get(API_URL+"/users/" + params.id)
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

    var gravatar = require('gravatar');
    var url = gravatar.url(state.email);

  return (
  <div>
    <Image src={url} roundedCircle />
    <h3>{state.name}</h3>
    <p>{state.title}</p>
    <p>Studying: {state.subjects}</p>
    <p>Area: {state.area}</p>
    <p>Age: {state.age}</p>
    <p>Introduction: {state.introduction}</p>
    <p>Goal: {state.goal}</p>
  </div>
  )
}

export default ShowUser
