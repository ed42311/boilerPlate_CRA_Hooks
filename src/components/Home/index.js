import React from 'react';

import ColorBlob from '../ColorBlob';
import { BlobInputContainerS, PageStyle } from '../Style';
import { withAuthorization } from '../Session';

const HomePage = () => (
  <PageStyle>
    <BlobInputContainerS>
      <ColorBlob/>
    </BlobInputContainerS>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </PageStyle>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
