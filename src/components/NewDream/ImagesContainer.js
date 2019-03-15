import React from 'react';

import styled, { css } from "styled-components";

function ImageContainer({url, selected, toggleSelected, saveCaption}) {

  return (
    <ThumbDiv selected={selected} onClick={(e) => toggleSelected(e, url)} autoFocus="autofocus">
      <ImageCaptioning src={url} alt="..."></ImageCaptioning>
      {(selected) ?
        <CaptionInput
          autoFocus="autofocus"
          defaultValue="write a caption"
          onKeyUp={(e) => e.keyCode === 13 && e.target.blur()}
          onBlur={(e) => saveCaption(e, url)}>
        </CaptionInput> :
        null
      }
    </ThumbDiv>
  )
}

const CaptionInput = styled.input`
  background-color: grey;
  font-family: serif;
  border: grey;
  text-align: left;
  overflow: scroll;
  color: white;
`

const ImageCaptioning = styled.img`
  padding-bottom: 0.5rem;
`

const ThumbDiv = styled.div`
  ${props => props.selected && css`
    background-color: grey;
    padding: 3px 3px 3px 3px;
    font-size: 80%;
    width: 150px;
    text-align: center;
  `}
`

export default ImageContainer;
