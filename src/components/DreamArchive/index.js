import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';


const ArchivePage = () => (
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