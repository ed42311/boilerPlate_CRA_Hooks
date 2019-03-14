import React, { Component } from 'react';
import styled from "styled-components";

import { withAuthorization } from '../Session';
import * as ROUTES from '../../Constants/routes';
import ColorBlob from '../ColorBlob';
import { withState } from 'recompose';

const { REACT_APP_BACKEND_URL } = process.env;

class NewDreamPage extends Component {
  state = {
    dreams: [],
    title:'',
    content:'',
    _id: '',
    userId: this.props.firebase.auth.O,
  }

  handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({[event.target.name]: event.target.value});
  }

  addDream = (e) => {
    e.preventDefault();
    const { title, content, userId } = this.state;
    if (!title || !content) {
      return;
    }
    if(title){
      fetch(`${REACT_APP_BACKEND_URL}/dreams`, {
        method: "POST",
        body: JSON.stringify({ title, content, userId }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
        this.props.history.push(ROUTES.DREAM_ARCHIVE);
      });
    }
  }

  render () {
    return(
      <PageStyle>
        <h1></h1>
        <ColorBlob/>
        <form onSubmit={ (e) => {e.preventDefault()} }>
        <DreamInput
          type="text"
          id="DreamTitle"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="title..."
        />
        <br/>
        <DreamTextarea
          type="text"
          rows="15"
          cols="30"
          name="content"
          id="DreamText"
          placeholder="start writing..."
          value={this.state.content}
          onChange={this.handleChange}
        />
        <br/>
        <SaveButton name="addDream" onClick={ (e) => {this.addDream(e)}}>Generate Images</SaveButton>
        </form>
      </PageStyle>
    );
  }
}

const PageStyle = styled.div`
  margin-left: 25px;
  text-align:center;
`
const DreamInput = styled.input`
  font-family: serif;
  font-size: xx-large;
  color: gray;
  border: white;
  text-align: left;
  margin-bottom: 150px;

`
const DreamTextarea = styled.textarea`
  width: 950px;
  font-family: serif;
  border: white;
  text-align: left;
  overflow: scroll;
  font-size: 200%;
  color: gray;
  line-height: 1.5;
  `
const SaveButton = styled.button`
  font-size: xx-large;
  color: gray;
  padding: 25px;
  border-radius: 1em 10em 10em 10em;
  margin-top: 15px;
  margin-bottom: 25px;
  font-family: serif;
  border-style: double;
  border-width: 4px;
  -webkit-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  &:hover{
    transition: 1s ease-in-out;
    background-color: turquoise;;
  }
`
const condition = authUser => !!authUser;

export default withAuthorization(condition)(NewDreamPage);
