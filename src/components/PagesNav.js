import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart } from '@fortawesome/free-solid-svg-icons';
import Weather from '../img/Weather.png';
import { Link } from 'react-router-dom';

import Toggle from 'react-toggle';
import 'react-toggle/style.css';
// Redux
import { connect } from 'react-redux';
import { CheckToggle } from '../actions/toggleAction';

const PagesNav = ({ CheckToggle, toggleCheck }) => {
  const ChangeToggle = () => {
    CheckToggle(toggleCheck);
  };
  const color = toggleCheck ? 'dark' : 'light';
  return (
    <div className='Nav'>
      <Navbar bg={color} expand='lg'>
        <Navbar.Brand href='/'>
          <img id='logo-size' src={Weather} alt='Weather logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Toggle
            id='biscuit-status'
            defaultChecked={toggleCheck}
            aria-labelledby='biscuit-label'
            onChange={ChangeToggle}
          />
          <span className={`Toggle-Text-${color}`}>Light theme</span>

          <Nav className='mr-auto'>
            <Link id={`Text-color-${color}`} to='/'>
              <FontAwesomeIcon icon={faHome} />
              Home
            </Link>
            <Link id={`Text-color-${color}`} to='/Favorites'>
              <FontAwesomeIcon icon={faHeart} />
              Favorites
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = state => ({
  toggleCheck: state.toggleReducer.toggleCheck
});
export default connect(mapStateToProps, { CheckToggle })(PagesNav);
