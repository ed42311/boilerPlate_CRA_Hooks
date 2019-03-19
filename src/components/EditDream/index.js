import React, { Component } from 'react';
import styled from "styled-components";

import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../Constants/routes';
import ColorBlob from '../ColorBlob';
import { BlobInputContainerS } from '../Style';

const { REACT_APP_BACKEND_URL } = process.env;

class EditDreamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.location.state.title,
      content: this.props.location.state.content,
      _id: this.props.location.state._id,
      userId: this.props.firebase.auth.O,
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({[event.target.name]: event.target.value});
  }

  addDream = (e) => {
    e.preventDefault();
    const { title, content, _id, userId } = this.state;
    if (!title || !content) {
      return;
    }
    if(title){
      fetch(`${REACT_APP_BACKEND_URL}/dreams`, {
        method: "PUT",
        body: JSON.stringify({ title, content, _id, userId }),
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

  deleteDream = (e) => {
    e.preventDefault();
    const { _id } = this.state;
    if(_id){
      fetch(`${REACT_APP_BACKEND_URL}/dreams`, {
        method: "DELETE",
        body: JSON.stringify({ _id }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
        this.props.history.push(ROUTES.DREAM_ARCHIVE);
      })
    }
  }

  render () {
    return(
      <div>
          <BlobInputContainerS>
          <ColorBlob/>
        </BlobInputContainerS>
        <AuthUserContext.Consumer>
          {authUser => (
            <EditStyles>
            <h1>Edit Dream Page</h1>
            <p>The Edit Dream Page is accessible by {authUser.email}.</p>
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
            <DeleteButton name="deleteDream" onClick={ (e) => {this.deleteDream(e)}}>Delete</DeleteButton>
            </form>
          </EditStyles>
          )}
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const EditStyles = styled.div`
  margin-left: 25px;
`

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
const DeleteButton = styled.button`
  color: white;
  background: black;
  padding: 15px;
  border-radius: 1em 5em 1em 5em / 2em 1em 2em 1em;
  margin-bottom: 25px;
  margin-left: 10px;
  font-size: x-large;
  border-style: double;
  border-width: 4px;
  -webkit-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
`
const condition = authUser => !!authUser;

export default withAuthorization(condition)(EditDreamPage);
