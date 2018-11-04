import React from 'react';
import { Link, navigate, redirectTo } from '@reach/router';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import StyledHeader from '../styles/Header.css.js';

const Header = props => {

  return (
    <StyledHeader>
      <button onClick={
        () => window.history.go('-1')
      }><FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h2>{props.currentPage}</h2>
      <button
        onClick={() => {
          Cookies.remove('knackUserToken');
          navigate({ to: '/login' });
        }}
      >Log out</button>
    </StyledHeader >
  )
}

export default Header;