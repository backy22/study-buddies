import React, { Component } from 'react';
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
    return (
    <div>
      <h3>{this.state.name}</h3>
      <p>{this.state.title}</p>
      <p>{this.state.area}</p>
      <p>{this.state.age}</p>
      <p>{this.state.introduction}</p>
      <p>{this.state.goal}</p>
      <p>{this.state.subjects}</p>
    </div>
    )
  }
}
