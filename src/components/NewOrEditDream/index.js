import React, { Component } from 'react';
import styled from "styled-components";

import { withAuthorization } from '../Session';
import * as ROUTES from '../../Constants/routes';
import ColorBlob from '../ColorBlob';

import ImageContainer from './ImagesContainer';
import { commonWords, archetypes } from './archetypes';
import { BlobInputContainerS } from '../Style';

const { REACT_APP_BACKEND_URL } = process.env;

class NewDreamPage extends Component {

  isNew = this.props.match.path === ROUTES.NEW_DREAM;

  state = {
    title: (this.props.location.state && this.props.location.state.title) || '',
    content: (this.props.location.state && this.props.location.state.content) || '',
    _id: (this.props.location.state && this.props.location.state._id) || '',
    userId: this.props.firebase.auth.O,
    imgUrlArr: (this.props.location.state && this.props.location.state.images) || [],
    editing: false,
    noKeyWordsInDream: this.isNew,
  }

  componentDidMount(){
    if(!this.isNew && this.state.imgUrlArr.length){
      const imgUrlArr = this.state.imgUrlArr.map((image) => {
        image.selected = true;
        return image;
      });
      this.setState({imgUrlArr});
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({[event.target.name]: event.target.value});
  }

  textAreaOnFocus = () => {
    let emptyImgUrlArr = [];
    this.setState({editing: true, imgUrlArr: emptyImgUrlArr});
  }

  textAreaOnBlur = () => {
    this.parseDreamContent();
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
    let keysArr = [];
    for (let i = 0; i < dreamWords.length; i++){
      let word = dreamWords[i];
      if (archetypes.includes(word) && !keysArr.includes(word)){
        keysArr.push(word);
      }
    }
    if (keysArr.length)this.setState({noKeyWordsInDream: false});
    return keysArr;
  };

  archButtonHandler() {
    const keyWords = this.parseDreamContent();
    if (!keyWords.length) {
       this.setState({noKeyWordsInDream: true});
       return;
    }
    let promiseArr = [];
    for (let i = 0; i < keyWords.length; i++) {
      let url = this.buildPromiseArr(keyWords[i]);
      promiseArr.push(url);
    }
    if(!promiseArr.length) return;
    this.promiseResolver(promiseArr);
  }

  // build pixabay search URL
  buildPromiseArr = (searchValue) => {
    const baseURL = 'https://pixabay.com/api/?key=11543969-d5ffb78383da99ab7336a1888';
    const imageType = '&image_type=photo&pretty=true';
    const searchTerm = '&q=' + searchValue;
    const completeURL = baseURL + searchTerm + imageType;
    return fetch(completeURL).then(res => {
      return new Promise((resolve) => {
        res.json().then((data) => {
          data.keyword = searchValue;
          resolve(data);
        })
      })
    });
  }

  promiseResolver = (arr) => {
    let thumbsArr = this.state.imgUrlArr.slice();
    Promise.all(arr).then((values) => {
      for (let i = 0; i < values.length; i++) {
        let rand = Math.floor(Math.random() * values[i].hits.length);
        thumbsArr.push({
          url: values[i].hits[rand].previewURL,
          selected: false,
          keyword: values[i].keyword});
      }
      this.setState({imgUrlArr: thumbsArr, editing: false});
    });
  }

  addDream = (e) => {
    e.preventDefault();
    const { _id, title, content, userId, imgUrlArr: thumbUrlObj} = this.state;
    if (!title || !content) {
      return;
    }
    const images = thumbUrlObj
      .filter((obj) => obj.selected === true)
      .map( obj => ({url: obj.url, caption: obj.caption, _id: obj._id}));

    const body = { title, content, userId, images };
    if(!this.isNew) body._id = _id;


    // Post to DB
    if(title){
      fetch(`${REACT_APP_BACKEND_URL}/dreams`, {
        method: this.isNew ? "POST" : "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then((myJson) => {
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

  toggleSelected = (e, url) => {
    let thumbsUrlObjs = this.state.imgUrlArr.slice().map((obj)=>{
      if (obj.url === url){
        obj.selected = !obj.selected;
      }
      return obj;
    })
    this.setState({imgUrlArr: thumbsUrlObjs})
  }

  saveCaption = (e, url) => {
    let thumbsUrlObjs = this.state.imgUrlArr.slice().map((obj)=>{
      if (obj.url === url){
        obj.caption = e.target.value;
      }
      return obj;
    })
    this.setState({imgUrlArr: thumbsUrlObjs})
  }

  render () {
    return(
      <PageStyle>
        <form
          onSubmit={ (e) => {e.preventDefault()} }
        >
        <BlobInputContainerS>
          <ColorBlob watchValue={this.state.content}/>
          <DreamTextarea
            onSubmit={ (e) => {e.preventDefault()}}
            type="textarea"
            rows="3"
            cols="25"
            name="content"
            id="DreamText"
            placeholder="Enter Dream Text (required)"
            value={this.state.content}
            onChange={e => this.handleChange(e)}
            onFocus={this.textAreaOnFocus}
            onBlur={this.textAreaOnBlur}
            onKeyUp={(e) => e.keyCode === 13 && e.target.blur()}
          />
        </BlobInputContainerS>
        <br/>
        <BlobInputContainerS>
          <ColorBlob/>
          <DreamInput
            type="text"
            id="DreamTitle"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Enter Dream Title (required)"
            onKeyUp={(e) => e.keyCode === 13 && e.target.blur()}
          />
        </BlobInputContainerS>
        <br />
        {this.state.content &&
          <ArchetypesButton
              onClick={ (e) => {this.archButtonHandler(e)}}
            >Generate Images
          </ArchetypesButton>
        }
        <br />
        {(!this.state.noKeyWordsInDream) &&
          <div>
           <ThumbsDiv id='image-container'>
            {this.state.imgUrlArr.map( (obj) =>
              <CaptionFrame key={obj.url}>
                <ImageContainer
                  key={obj.url}
                  url={obj.url}
                  selected={obj.selected}
                  caption={this.isNew ? "write a caption" : obj.caption }
                  toggleSelected={this.toggleSelected}
                  saveCaption={this.saveCaption}
                />
              </CaptionFrame>
            )}
            </ThumbsDiv>
          </div>
        }
        {(!!this.state.title && !!this.state.content) &&
          <SaveButton
            type="button"
            name="addDream"
            onClick={ (e) => {this.addDream(e)}}
          >Save Dream
          </SaveButton>
        }
        </form>
        {!this.isNew &&
          <DeleteButton name="deleteDream" onClick={this.deleteDream}>Delete</DeleteButton>
        }
      </PageStyle>
    );
  }
}

const DeleteButton = styled.button`
  color: gray;
  padding: 15px;
  border-radius: 1em 10em 10em 10em;
  margin-bottom: 25px;
  margin-left: 10px;
  font-size: x-large;
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

const CaptionFrame = styled.div`
  display: inline-block;
`

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
  padding: 10px;
  z-index: 20;
  width: 350px;
  font-family: serif;
  color: gray;
  font-size: x-large;
  font-weight: 900;
  border: white;
  text-align: left;
  margin-bottom: 2rem;
  margin-top: 1.8rem;
  position: relative;
  background: rgba(255,255,255,0.3);
  border-radius: 6px;
  &::placeholder{
    color: gray;
    font-weight: 900;
    font-size: x-large;
  }
  &:focus{
    outline:none;
  }
`
const DreamTextarea = styled.textarea`
  z-index: 20;
  font-family: serif;
  color: gray;
  font-size: large;
  font-weight: 900;
  border: white;
  text-align: left;
  overflow: scroll;
  font-size: 2rem;
  line-height: 1.5;
  padding: 10px 0 0 10px;
  position: relative;
  background: rgba(255, 255, 255,.3);
  resize: none;
  &::placeholder{
    color: gray;
    font-weight: 900;
  }
  &:focus{
    outline:none;
  }
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
