import React, { Component } from 'react';
import axios from 'axios'; 
import * as Datetime from 'react-datetime';
import { API_URL } from "../config";

export default class EditGroups extends Component {
  constructor(props){
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeStartAt = this.onChangeStartAt.bind(this);
    this.onChangeEndAt = this.onChangeEndAt.bind(this);
    this.onChangePeople = this.onChangePeople.bind(this);
    this.onChangeIsPrivate = this.onChangeIsPrivate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      address: '',
      start_at: new Date(),
      end_at: new Date(),
      people: 0,
      is_private: false,
      organizer_id: '',
      user_ids: []
    }
  }


  componentDidMount(){
    axios.get(API_URL+"/groups/"+this.props.match.params.id)
      .then(response => {
        this.setState({
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

    console.log(this.state)

    axios.get(API_URL+"/users/")
      .then(response => {
        if (response.data.length > 0){
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeStartAt(date) {
    this.setState({
      start_at: date._d
    });
  }

  onChangeEndAt(date) {
    this.setState({
      end_at: date._d
    });
  }

  onChangePeople(e) {
    this.setState({
      people: e.target.value
    });
  }

  onChangeIsPrivate(e) {
    this.setState({
      is_private: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();

    const group = {
      title: this.state.title,
      description: this.state.description,
      address: this.state.address,
      start_at: this.state.start_at,
      end_at: this.state.end_at,
      people: this.state.people,
      is_private: this.state.is_private,
      organizer_id: this.state.organizer_id,
      user_ids: this.state.user_ids
    }

    console.log(group);

    axios.post(API_URL+"/groups/update/"+this.props.match.params.id, group)
      .then(res => console.log(res.data));

    window.location = '/';

  }

   render() {
    return (
    <div>
      <h3>Edit Group</h3>
      <form onSubmit={this.onSubmit}>
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
          <label>DateTime: </label>
          <div>
            <Datetime
              value={this.state.start_at}
              dateTime={this.state.start_at}
              onChange={this.onChangeStartAt}
            /> ~
            <Datetime
              value={this.state.end_at}
              dateTime={this.state.end_at}
              onChange={this.onChangeEndAt}
            />
          </div>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Limit number: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.people}
              onChange={this.onChangePeople}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Group Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
