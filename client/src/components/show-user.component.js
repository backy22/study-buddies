import React, { useState, useEffect } from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from "react-router";
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
    axios.get(API_URL+"/users/api/" + params.id)
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
  <div className="content">
    <Container className="mb-5">
      <Row>
        <Col xs lg="2" className="text-center">
          <Image src={url} roundedCircle />
        </Col>
        <Col>
          <h3>{state.name} {state.age}, {state.area}</h3>
          <p>{state.title}</p>
        </Col>
      </Row>
    </Container>
    <h4>Studying</h4>
    <p className="mb-5">{state.subjects.join(',')}</p>
    <h4>Goal</h4>
    <p className="mb-5">{state.goal}</p>
    <h4>Introduction:</h4>
    <p>{state.introduction}</p>
  </div>
  )
}

export default ShowUser
