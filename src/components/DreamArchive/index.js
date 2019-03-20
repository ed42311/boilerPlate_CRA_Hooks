import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ColorBlob from '../ColorBlob';
import { AuthUserContext, withAuthorization } from '../Session';
import { BlobInputContainerS } from '../Style';

const { REACT_APP_BACKEND_URL } = process.env;

class ArchivePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.firebase.auth.O,
      dreams: []
    };
  }

  componentDidMount() {
    const { userId } = this.state;
    fetch(`${REACT_APP_BACKEND_URL}/dreams/?userId=${userId}`)
      .then(response => response.json())
      .then((myJson) => {
        this.setState({dreams: myJson});
      })
  }

  render() {

    return(
      <PageStyle>
        <BlobInputContainerS>
          <ColorBlob/>
        </BlobInputContainerS>
        <BlobInputContainerS>
          <ColorBlob/>
        </BlobInputContainerS>
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
              <h1 id="test-dreamarchive-user-h1">Dream Archive for {authUser.email}</h1>
              {this.state.dreams.map( (dream) =>
                <DreamDiv key={dream._id} >
                  <TitleRowDiv>
                    <h2>{dream.title}</h2>
                    <Link to={{
                      pathname: './editDream',
                      state: {
                        title: dream.title,
                        content: dream.content,
                        _id: dream._id,
                        userId: dream.userId,
                        images: dream.images,
                      }
                    }}>Edit Dream</Link>
                  </TitleRowDiv>
                  <StyledHR />
                  <ContentRowDiv>
                    <p>{dream.content}</p>
                  </ContentRowDiv>
                  <StyledHR />
                  <ImgRowDiv>
                    {dream.images.length &&
                      dream.images.map( (image) => <StyledImg src={image.url} key={image._id}/>)
                    }
                  </ImgRowDiv>
                </DreamDiv>
              )}
            </div>
          )}
        </AuthUserContext.Consumer>
      </PageStyle>
    )
  }
}

const StyledImg = styled.img`
  margin: 10px;
  border-radius: 15px;
  opacity: 0.75;
  -webkit-box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  -moz-box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  &:hover{
    transition: 1s ease-in-out;
    opacity: 1.0;
  }
`

const StyledHR = styled.hr`
  border: 0.5px solid rgba(0,0,0,.1);
  width: 100%;
`

const TitleRowDiv = styled.div`
  display: flex;
  justify-content: inherit;
`

const ContentRowDiv = styled.div`
`

const ImgRowDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const PageStyle = styled.div`
  margin-left: 25px;
`

const DreamDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 60%;
  padding: 15px;
  border-radius: 1em 5em 1em 5em / 2em 1em 2em 1em;
  margin-bottom: 25px;
  font-size: small;
  border-style: double;
  border-width: 4px;
  -webkit-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
`

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ArchivePage);
