import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from "../config";

export default class ShowUser extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      title: '',
      area: '',
      age: '',
      email: '',
      introduction: '',
      goal: '',
      subjects: []
    }
  }

  componentDidMount(){
    axios.get(API_URL+"/users/"+this.props.match.params.id)
      .then(response => {
        this.setState({
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

  }

  render() {
    var gravatar = require('gravatar');
    var url = gravatar.url(this.state.email);

    return (
    <div>
      <Image src={url} roundedCircle />
      <h3>{this.state.name}</h3>
      <p>{this.state.title}</p>
      <p>Studying: {this.state.subjects}</p>
      <p>Area: {this.state.area}</p>
      <p>Age: {this.state.age}</p>
      <p>Introduction: {this.state.introduction}</p>
      <p>Goal: {this.state.goal}</p>
    </div>
    )
  }
}
