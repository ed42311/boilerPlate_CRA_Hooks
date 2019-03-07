import React, { useEffect } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';


const ArchivePage = () => (
  
  useEffect(() => {
    fetch('http://localhost:3001/test')
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