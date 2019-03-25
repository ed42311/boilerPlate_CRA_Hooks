import React from 'react';

import styled from "styled-components";

function ImageContainer({url, toggleSelected, saveCaption, caption}) {
  //if (!selected) return null;
  return (
    <ThumbDiv>
      <div>
        <ImageCaptioning
        className="imageGenerated"
        src={url}
        alt="..."
        />
        <ButtonS onClick={(e) => toggleSelected(e, url)}>X</ButtonS>
        <CaptionInput
          autoFocus="autofocus"
          placeholder={"write a caption"}
          defaultValue={caption && caption}
          onKeyUp={(e) => e.keyCode === 13 && e.target.blur()}
          onBlur={(e) => saveCaption(e, url)}>
        </CaptionInput>
      </div>
    </ThumbDiv>
  )
}

const ButtonS = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 12px;
  opacity: 0.8;
`

const CaptionInput = styled.input`
  margin-left: 15px;
  margin-top: -2rem;
  font-family: serif;
  border: transparent;
  text-align: center;
  overflow: scroll;
  color: darkgrey;
`

const ImageCaptioning = styled.img`
  width: 100%;
  height: 100%;
  margin: 10px;
  border-radius: 15px;
  opacity: 0.75;
  -webkit-box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  -moz-box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  &:hover {
    transition: 0.5s ease-in-out;
    opacity: 1.0;
  }
`

const ThumbDiv = styled.div`
  position: relative;
  display: inline-block;
  padding: 3px 3px 3px 3px;
  font-size: 80%;
  width: 150px;
  text-align: center;
  margin-bottom: 5px;
`

export default ImageContainer;
