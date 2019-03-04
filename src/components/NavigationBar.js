import React from 'react';
import { HOME, TEST, AUTHENTICATED, NOT_AUTHENTICATED } from '../Constants/Routes';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function NavigationBar() {
  return(
    <UlStyles>
      <li><Link to={HOME}>Link to Home</Link></li>
      <li><Link to={TEST}>Link to Test</Link></li>
      <li><Link to={AUTHENTICATED}>Link to Authenticated</Link></li>
      <li><Link to={NOT_AUTHENTICATED}>Link to NotAuthenticated</Link></li>
    </UlStyles>
  )
}
const UlStyles = styled.ul`
  list-style: none;
`
