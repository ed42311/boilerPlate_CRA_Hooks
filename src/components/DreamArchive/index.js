import React, { Component } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

import { AuthUserContext, withAuthorization } from '../Session';

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
      <AuthUserContext.Consumer>
        {authUser => (
          <PageStyle>
            <h1>user ID: {authUser.uid}</h1>
            <h1 id="test-dreamarchive-user-h1">Dream Archive for {authUser.email}</h1>
            {this.state.dreams.map( (dream) =>
              <DreamDiv key={dream._id} >
                <h2>{dream.title}</h2>
                <p>{dream.content}</p>
                <Link to={{
                  pathname: './editDream',
                  state: {
                    title: dream.title,
                    content: dream.content,
                    _id: dream._id,
                    userId: dream.userId,
                  }
                }}>Edit Dream</Link>
              </DreamDiv>
            )}
          </PageStyle>
        )}
      </AuthUserContext.Consumer>
    )
  }
}

const PageStyle = styled.div`
  margin-left: 25px;
`

const DreamDiv = styled.div`
  width: 75%;
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
