import React, { Component } from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

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
    noKeyWordsInDream: false,
  }

  componentDidMount(){
    if(!this.isNew && this.state.imgUrlArr.length){
      const imgUrlArr = this.state.imgUrlArr.map((image) => {
        return image;
      });
      this.setState({imgUrlArr});
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({[e.target.name]: e.target.value});
  }

  textAreaOnFocus = () => {
    this.setState({editing: true});
  }

  textAreaOnBlur = () => {
  }

  parseDreamContent = () => {
    //remove common words
    let lower = this.state.content.toLowerCase();
    lower = lower.replace(/[^\w\d ]/g, '');
    let dreamWords = lower.split(' ');
    dreamWords = dreamWords.filter( (word) => {
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
    if (keysArr.length) this.setState({noKeyWordsInDream: false});
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
      let data = this.buildPromiseArr(keyWords[i]);
      promiseArr.push(data);
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
        let oldUrls = thumbsArr.map( obj => obj.url)
        let newValue = {
          url: values[i].hits[2].previewURL,

          keyword: values[i].keyword
        };
        if (!oldUrls.includes(newValue.url)) thumbsArr.push(newValue);
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
    let indexToRemove;
    let thumbsUrlObjs = this.state.imgUrlArr.slice().map((obj)=>{

      if (obj.url === url){
        indexToRemove = this.state.imgUrlArr.indexOf(obj)
      }
      return obj;
    })
    thumbsUrlObjs.splice(indexToRemove, 1);
    console.log(thumbsUrlObjs);
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
          <ColorBlob
          watchValue={this.state.content}
          leftAlign={-11}
          topAlign={4}
          />
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
          <ColorBlob
          leftAlign={-9}
          topAlign={6}
          />
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
              id="archButton"
              onClick={ (e) => {this.archButtonHandler(e)}}
            >Generate <br/> Images
          </ArchetypesButton>
        }
        <br />
        {(this.state.noKeyWordsInDream && !!this.state.content.length) &&
        <h4>No keywords currently present in dream -- unable to generate images.</h4>}
        {(!this.state.noKeyWordsInDream) &&
          <div>
           <ThumbsDiv id='image-container'>
            {this.state.imgUrlArr.map( (obj) =>
                <ImageContainer
                  id="image-subcontainer"
                  key={obj.url}
                  url={obj.url}
                  caption={obj.caption}
                  toggleSelected={this.toggleSelected}
                  saveCaption={this.saveCaption}
                />
            )}
            </ThumbsDiv>
          </div>
        }
        {(!!this.state.title && !!this.state.content) &&
          <SaveButton
            type="button"
            name="addDream"
            onClick={ (e) => {this.addDream(e)}}
          >Save <br/> Dream
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
  -webkit-box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  -moz-box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  &:hover{
    transition: 1s ease-in-out;
    background-color: turquoise;;
  }
`

const ArchetypesButton = styled.button`
  font-size: x-large;
  padding: 15px;
  line-height: 1.5rem;
  color: gray;
  border-radius: 1em 10em 10em 10em;
  margin-top: 15px;
  margin-bottom: 25px;
  font-family: serif;
  border-style: double;
  border-width: 4px;
  -webkit-box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  -moz-box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  &:hover{
    transition: 1s ease-in-out;
    background-color: turquoise;;
  }
`

const ThumbsDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 5px;
`

const PageStyle = styled.div`
  margin-left: 25px;
  text-align: center;
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
  font-size: x-large;
  padding: 15px;
  line-height: 1.5rem;
  color: gray;
  border-radius: 1em 10em 10em 10em;
  margin-top: 15px;
  margin-bottom: 25px;
  font-family: serif;
  border-style: double;
  border-width: 4px;
  -webkit-box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  -moz-box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  &:hover{
    transition: 1s ease-in-out;
    background-color: turquoise;;
  }
`

// PropTypes

NewDreamPage.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  _id: PropTypes.string,
  userId: PropTypes.string,
  imgUrlArr: PropTypes.array,
};


const condition = authUser => !!authUser;

export default withAuthorization(condition)(NewDreamPage);
