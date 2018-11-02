import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import StyledHeader from '../styles/Header.css.js';

const Header = props => {
  return (
    <StyledHeader>
      <button onClick={() => console.log('go back to previous page')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h2>{props.currentPage}</h2>
      <button onClick={() => console.log('logging out...')}>Log out</button>
    </StyledHeader>
  )
}

export default Header;