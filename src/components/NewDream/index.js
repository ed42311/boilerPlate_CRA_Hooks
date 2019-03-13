import React, { Component } from 'react';
import styled from "styled-components";


import { withAuthorization } from '../Session';
import * as ROUTES from '../../Constants/routes';

import { commonWords, keyWords } from './archetypes';

const { REACT_APP_BACKEND_URL } = process.env;

class NewDreamPage extends Component {
  state = {
    dreams: [],
    title:'',
    content:'',
    _id: '',
    userId: this.props.firebase.auth.O,
    imgArr: [],
  }

  handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({[event.target.name]: event.target.value});
  }

  // add img urls to state

  urlsToState = (url) =>{
    let thumbsArr = this.state.imgArr.slice();
    thumbsArr.push(url);
    this.setState({imgArr: thumbsArr});
  }

  addDream = (e) => {
    e.preventDefault();
    const self = this;
    const { title, content, userId, imgArr } = this.state;
    if (!title || !content) {
      return;
    }

    //get just the unique words
    let lower = content.toLowerCase();
    lower = lower.replace(/[^\w\d ]/g, '');
    let dreamWords = lower.split(' ')
    dreamWords = dreamWords.filter(function (word) {
      return commonWords.indexOf(word) === -1;
    });

    // match against archetypes
    for (let i = 0; i < dreamWords.length; i++){
      let word = dreamWords[i];
      if (keyWords.includes(word)){
        buildCompleteURL(word);
        // const pTag = document.createElement('p');
        // pTag.textContent = word;
        // document.getElementById('image-container').append(pTag);
      }
    }

    // build pixabay search URL
    function buildCompleteURL(searchValue) {
      const baseURL = 'https://pixabay.com/api/?key=11543969-d5ffb78383da99ab7336a1888';
      const imageType = '&image_type=photo&pretty=true';
      const searchTerm = '&q=' + searchValue;
      const completeURL = baseURL + searchTerm + imageType;
      callPixa(completeURL);
    }

    // call pixabay
    function callPixa(url) {
      console.log(self);
      fetch(url)
      .then(response => response.json())
      .then((data) => {
        self.urlsToState(data.hits[0].previewURL)
        //appendImg(data.hits[0])
      });
    }

    // add pixabay results to page
    function appendImg(imageObject) {
      const htmlTemplate =`
          <div>
              <img src="${imageObject.previewURL}" alt="..." >
          </div>
        `
      const imgDiv = document.createElement('div');
      imgDiv.innerHTML = htmlTemplate;
      document.getElementById('image-container').append(imgDiv);
    }

    // Post to DB
    if(title){
      console.log("state imgarr ", imgArr);
      fetch(`${REACT_APP_BACKEND_URL}/dreams`, {
        method: "POST",
        body: JSON.stringify({ title, content, userId, imgArr }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
        // this.props.history.push(ROUTES.DREAM_ARCHIVE);
      });
    }
  }

  render () {
    return(
      <PageStyle>
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
        <ThumbsDiv id='image-container'></ThumbsDiv>
      </PageStyle>
    );
  }
}

const ThumbsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 5px;
`

const PageStyle = styled.div`
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
const condition = authUser => !!authUser;

export default withAuthorization(condition)(NewDreamPage);
