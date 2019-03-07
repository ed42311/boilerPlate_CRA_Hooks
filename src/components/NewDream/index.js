import React from 'react';

import { withAuthorization } from '../Session';

const NewDreamPage = () => (
  <div>
    <h1>New Dream Page</h1>
    <p>The New Dream Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(NewDreamPage);