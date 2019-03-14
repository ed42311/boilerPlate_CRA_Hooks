import React from 'react';

import styled, { css } from "styled-components";

function ImageContainer({url, selected, toggleSelected}) {

  return (
    <ThumbDiv selected={selected} onClick={(e) => toggleSelected(e, url)}>
      <img src={url} alt="..." ></img>
    </ThumbDiv>
  )
}

const ThumbDiv = styled.div`
  ${props => props.selected && css`
    background-color: blue;
    padding: 3px 3px 3px 3px;
  `}

`

export default ImageContainer;
