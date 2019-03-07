import React, { Component } from 'react';
import styled from "styled-components";

import { withAuthorization } from '../Session';

class NewDreamPage extends Component {
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
        />
        <br/>
        <SaveButton>Save</SaveButton>
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