import React, { useEffect } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
const { REACT_APP_BACKEND_URL } = process.env;

const ArchivePage = () => (
  
  useEffect(() => {
    fetch(`${REACT_APP_BACKEND_URL}/test`)
      .then(response => response.json())
      .then((myJson) => {
        console.log(myJson);
      })
  }),

  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Dream Archive for {authUser.email}</h1>
        
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ArchivePage);