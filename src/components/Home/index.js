import React from 'react';
import styled from 'styled-components';

import ColorBlob from '../ColorBlob';
import { BlobInputContainerS, PageStyle } from '../Style';
import { withAuthorization } from '../Session';

const HomePage = () => (
  <PageStyle>
    <BlobInputContainerS>
      <ColorBlob/>
    </BlobInputContainerS>
    <HomeFont>Home Page</HomeFont>
    <HomeContent>The Home Page is accessible by every signed in user.</HomeContent>
  </PageStyle>
);

const HomeFont = styled.h1`
  font-family: serif;
  color: gray;
  font-size: xx-large;
  font-weight: 900;
`
const HomeContent = styled.p`
  font-family: serif;
  color: gray;
  font-size: x-large;
  font-weight: 900;
`
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
