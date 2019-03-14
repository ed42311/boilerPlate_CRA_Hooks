import React, { Component } from 'react';
import styled from "styled-components";


import { withAuthorization } from '../Session';
import * as ROUTES from '../../Constants/routes';
import ColorBlob from '../ColorBlob';
import { withState } from 'recompose';

import ImageContainer from './ImagesContainer'
import { commonWords, archetypes } from './archetypes';

const { REACT_APP_BACKEND_URL } = process.env;

class NewDreamPage extends Component {
  state = {
    dreams: [],
    title:'',
    content:'',
    _id: '',
    userId: this.props.firebase.auth.O,
    keyWords: [],
    imgUrlArr: [],
    editing: false,
  }

  handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({[event.target.name]: event.target.value});
  }

  textAreaOnFocus = () => {
    let emptyKeywords = [];
    let emptyImgUrlArr = [];
    this.setState({editing: true, keyWords: emptyKeywords, imgUrlArr: emptyImgUrlArr});
  }

  textAreaOnBlur = () => {
  }

  parseDreamContent = (e) => {
    //remove common words
    let lower = this.state.content.toLowerCase();
    lower = lower.replace(/[^\w\d ]/g, '');
    let dreamWords = lower.split(' ');
    dreamWords = dreamWords.filter(function (word) {
      return commonWords.indexOf(word) === -1;
    });

    // match against archetypes
    let keysArr = this.state.keyWords.slice();
    for (let i = 0; i < dreamWords.length; i++){
      let word = dreamWords[i];
      if (archetypes.includes(word)){
        keysArr.push(word);
      }
    }
    this.setState({keyWords: keysArr});
  }

  async archButtonHandler() {
    await this.parseDreamContent();
    const { keyWords } = this.state;
    if (this.state.keyWords === []) return;
    let promiseArr = [];
    for (let i = 0; i < keyWords.length; i++) {
      let url = this.buildPromiseArr(keyWords[i]);
      promiseArr.push(url);
    }
    this.promiseResolver(promiseArr);
  }

  // build pixabay search URL
  buildPromiseArr = (searchValue) => {
    const baseURL = 'https://pixabay.com/api/?key=11543969-d5ffb78383da99ab7336a1888';
    const imageType = '&image_type=photo&pretty=true';
    const searchTerm = '&q=' + searchValue;
    const completeURL = baseURL + searchTerm + imageType;
    return fetch(completeURL).then(res => res.json());
  }

  promiseResolver = (arr) => {
    let thumbsArr = this.state.imgUrlArr.slice();
    Promise.all(arr).then((values) => {
      for (let i = 0; i < values.length; i++) {
        let randomIndex = Math.floor(Math.random() * values[i].hits.length);
        thumbsArr.push({url: values[i].hits[randomIndex].previewURL, selected: false});
      }
      this.setState({imgUrlArr: thumbsArr, editing: false});
      console.log(this.state.imgUrlArr)
    });
  }

  addDream = (e) => {
    e.preventDefault();
    const { title, content, userId, imgUrlArr} = this.state;
    if (!title || !content) {
      return;
    }
    // Post to DB
    if(title){
      fetch(`${REACT_APP_BACKEND_URL}/dreams`, {
        method: "POST",
        body: JSON.stringify({ title, content, userId, imgUrlArr }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then((myJson) => {
        console.log(myJson);
        // this.props.history.push(ROUTES.DREAM_ARCHIVE);
      });
    }
  }

  toggleSelected = (e, url) => {
    console.log(url)
    let thumbsUrlObjs = this.state.imgUrlArr.slice().map((obj)=>{
      if (obj.url === url){
        obj.selected = !obj.selected
      }
      return obj;
    })
    this.setState({imgUrlArr: thumbsUrlObjs})
  }

  render () {
    return(
      <PageStyle>
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
          rows="8"
          cols="30"
          name="content"
          id="DreamText"
          placeholder="start writing..."
          value={this.state.content}
          onChange={this.handleChange}
          onFocus={this.textAreaOnFocus}
          onBlur={this.textAreaOnBlur}
        />
        <br/>
        {(this.state.editing) ?
          <ArchetypesButton
            onClick={ (e) => {this.archButtonHandler(e)}}
          >Generate Images
          </ArchetypesButton> :

          <SaveButton
            name="addDream"
            onClick={ (e) => {this.addDream(e)}}
          >Save Dream
          </SaveButton>
        }
        </form>
        <ThumbsDiv id='image-container'>
          {this.state.imgUrlArr.map( (obj) =>
            <ImageContainer
              key={obj.url}
              url={obj.url}
              selected={obj.selected}
              toggleSelected={this.toggleSelected}
            />
          )}
        </ThumbsDiv>
      </PageStyle>
    );
  }
}

const ArchetypesButton = styled.button`
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

const ThumbsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 5px;
`

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
