import React from 'react';

import styled, { css } from "styled-components";

function ImageContainer({url, selected, toggleSelected, saveCaption, caption}) {

  return (
    <ThumbDiv selected={selected} >
      {(selected) &&
        <div>
          <ImageCaptioning
          src={url}
          alt="..."
        />
        <ButtonS onClick={(e) => toggleSelected(e, url)}>X</ButtonS>
        <CaptionInput
          autoFocus="autofocus"
          defaultValue={caption}
          onKeyUp={(e) => e.keyCode === 13 && e.target.blur()}
          onBlur={(e) => saveCaption(e, url)}>
        </CaptionInput>
        </div>
      }
    </ThumbDiv>
  )
}
const ButtonS = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`

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
    position: relative;
    display: inline-block;
    background-color: grey;
    padding: 3px 3px 3px 3px;
    font-size: 80%;
    width: 150px;
    text-align: center;
  `}
`

export default ImageContainer;
