import React from 'react';
import styled from 'styled-components'

import ColorBlob from '../ColorBlob'
const Landing = () => (
  <div>
    <LandingText>
      Hypnagogia, also referred to as "hypnagogic hallucinations" or
      "seeing colors while falling asleep",
      is the experience of transitioning from wakefulness to sleep:
    </LandingText>
    <ColorBlob/>
  </div>
);

const LandingText=styled.h4`
  font-family: serif;
  color: gray;
  font-size: xx-large;
  font-weight: 900;
`

export default Landing;
