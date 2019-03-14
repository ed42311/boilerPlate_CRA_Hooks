import React from 'react';

import styled from "styled-components";

function ImageContainer({url}) {

  return (
    <div>
      <img src={url} alt="..." ></img>
    </div>
  )
}

export default ImageContainer;
