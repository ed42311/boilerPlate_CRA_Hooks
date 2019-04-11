import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HOME, OTHER } from '../../Constants/routes';

function ButtonAppBar() {
  return (
    <div>
      <ul>
        <li>
          <Link to={HOME}>Home</Link>
        </li>
        <li>
          <Link to={OTHER}>Other</Link>
        </li>
      </ul>
    </div>
  );
}

export default ButtonAppBar;
