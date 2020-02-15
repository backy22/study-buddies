import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { API_URL } from "../config";

class EditUser extends Component {
  constructor(props){
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeArea = this.onChangeArea.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeIntroduction = this.onChangeIntroduction.bind(this);
    this.onChangeGoal = this.onChangeGoal.bind(this);
    this.onChangeSubjects = this.onChangeSubjects.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      title: '',
      area: '',
      age: '',
      email: '',
      introduction: '',
      goal: [],
      subjects: []
    }
  }

  componentDidMount(){
    const user = this.props.auth.user
    axios.get(API_URL+"/users/"+user.id)
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

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeArea(e) {
    this.setState({
      area: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }

  onChangeIntroduction(e) {
    this.setState({
      introduction: e.target.value
    });
  }

  onChangeGoal(e) {
    this.setState({
      goal: e.target.value
    });
  }

  onChangeSubjects(subjects) {
    this.setState({subjects});
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      name: this.state.name,
      title: this.state.title,
      area: this.state.area,
      age: this.state.age,
      email: this.state.email,
      introduction: this.state.introduction,
      goal: this.state.goal,
      subjects: this.state.subjects
    }

    axios.post(API_URL+"/users/update/"+this.props.match.params.id, user)
      .then(res => console.log(res.data));

  }

  render() {
    var gravatar = require('gravatar');
    var url = gravatar.url(this.state.email);

    return (
      <div>
        <h3>Edit Profile</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Handlename: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="mb-1">
            <div><img src={url} /></div>
            <small>※If you want to change image, please upload from <a href="https://en.gravatar.com/emails/" target="blank">here.</a></small>
          </div>
          <div className="form-group"> 
            <label>Subjects: </label>
            <TagsInput
                className="form-control"
                value={this.state.subjects}
                onChange={this.onChangeSubjects}
                />
          </div>
          <div className="form-group"> 
            <label>Goal: </label>
            <input type="text"
                className="form-control"
                value={this.state.goal}
                onChange={this.onChangeGoal}
                />
          </div>
          <div className="form-group"> 
            <label>Title: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}
                />
          </div>
          <div className="form-group"> 
            <label>Area: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.area}
                onChange={this.onChangeArea}
                />
          </div>
          <div className="form-group"> 
            <label>Age: </label>
            <input  type="number"
                required
                className="form-control"
                value={this.state.age}
                onChange={this.onChangeAge}
                />
          </div>
          <div className="form-group"> 
            <label>Introduction: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.introduction}
                onChange={this.onChangeIntroduction}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Update User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

EditUser.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(EditUser);
