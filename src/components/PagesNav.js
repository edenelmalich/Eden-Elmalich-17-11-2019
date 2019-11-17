import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart } from '@fortawesome/free-solid-svg-icons';
import Weather from '../img/Weather.png';
const PagesNav = () => {
  return (
    <div className='Nav'>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='/'>
          <img id='logo-size' src={Weather} alt='Weather logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/'>
              <FontAwesomeIcon icon={faHome} />
              Home
            </Nav.Link>
            <Nav.Link href='/Favorites'>
              <FontAwesomeIcon icon={faHeart} />
              Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default PagesNav;
