import React, { Component } from 'react';
import styled from "styled-components";

import { withAuthorization } from '../Session';

class NewDreamPage extends Component {
  state = {
    dreams: [],
    title:'',
    content:'',
    _id: ''
  }

  handleChange = (event) => {
    console.log("handlechange")
    event.preventDefault();
    event.stopPropagation();
    this.setState({[event.target.name]: event.target.value});
  }

  addDream = (e) => {
    e.preventDefault();
    const { title, content } = this.state;
    if (!title || !content) {
      return;
    }
    if(title){
      fetch('http://localhost:3001/dreams', {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then((newDream) => {
        console.log(newDream);
      });
    }
  }

  render () {
    return(
      <div>
        <h1>New Dream Page</h1>
        <p>The New Dream Page is accessible by every signed in user.</p>
        <form onSubmit={ (e) => {e.preventDefault()} }>
        <DreamInput
          type="text"
          id="DreamTitle"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="Enter Dream Title"
        />
        <br/>
        <DreamTextarea
          type="text"
          rows="10"
          cols="30"
          name="content"
          id="DreamText"
          placeholder="Enter New Dream"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <br/>
        <SaveButton name="addDream" onClick={ (e) => {this.addDream(e)}}>Save</SaveButton>
        </form>
      </div>
    );
  }
}

const DreamTextarea = styled.textarea`
  padding: 15px;
  border-radius: 1em 5em 1em 5em / 2em 1em 2em 1em;
  margin-bottom: 25px;
  font-size: x-large;
  border-style: double;
  border-width: 4px;
  -webkit-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
`
const DreamInput = styled.input`
  padding: 15px;
  border-radius: 1em 5em 1em 5em / 2em 1em 2em 1em;
  margin-bottom: 25px;
  font-size: x-large;
  border-style: double;
  border-width: 4px;
  -webkit-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
`
const SaveButton = styled.button`
  padding: 15px;
  border-radius: 1em 5em 1em 5em / 2em 1em 2em 1em;
  margin-bottom: 25px;
  font-size: x-large;
  border-style: double;
  border-width: 4px;
  -webkit-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
`
const condition = authUser => !!authUser;

export default withAuthorization(condition)(NewDreamPage);
