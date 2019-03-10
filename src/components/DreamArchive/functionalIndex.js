import React, { useEffect } from 'react';
import styled from "styled-components";

import { AuthUserContext, withAuthorization } from '../Session';

const { REACT_APP_BACKEND_URL } = process.env;

const ArchivePage = () => (
  
  useEffect(() => {
    fetch(`${REACT_APP_BACKEND_URL}/dreams`)
      .then(response => response.json())
      .then((myJson) => {
        console.log(myJson);
        resolveCall(myJson);
      })
  }),

  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Dream Archive for {authUser.email}</h1>
        <DreamsDiv id='container'></DreamsDiv>
      </div>
    )}
  </AuthUserContext.Consumer>
);

function resolveCall(data) {
  console.log(data)
  for (let i = 0; i<data.length;i++ ){
    const h2Tag = document.createElement('h2');
    h2Tag.textContent = data[i].title;

    const pTag =  document.createElement('p');
    pTag.textContent = data[i].content;

    const hrTag = document.createElement('hr');
   
    document.getElementById('container').append(h2Tag, pTag, hrTag);
  }
};

const DreamsDiv = styled.div`
  width: 75%;
  padding: 15px;
  border-radius: 1em 5em 1em 5em / 2em 1em 2em 1em;
  margin-bottom: 25px;
  margin-left: 25px;
  font-size: small;
  border-style: double;
  border-width: 4px;
  -webkit-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
`

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ArchivePage);