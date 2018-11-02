import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import StyledHeader from '../styles/Header.css.js';
import { Link } from '@reach/router';

const Header = props => {
  return (
    <StyledHeader>
      <Link to="/">
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <h2>{props.currentPage}</h2>
      <button onClick={() => console.log('logging out...')}>Log out</button>
    </StyledHeader>
  )
}

export default Header;