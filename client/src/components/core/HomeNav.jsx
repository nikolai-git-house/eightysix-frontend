import React from 'react';
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { LOGIN_ROUTE, APP_MAIN_ROUTE } from 'configs/constants';

const HomeNav = () => {
  const Links = [
    {
      id: 'services',
      title: 'OUR SERVICE',
      to: `${APP_MAIN_ROUTE}#services`,
    },
    {
      id: 'partners',
      title: 'PARTNERS',
      to: `${APP_MAIN_ROUTE}#partners`,
    },
    {
      id: 'howitworks',
      title: 'HOW IT WORKS',
      to: `${APP_MAIN_ROUTE}#howitworks`,
    },
    {
      id: 'contactus',
      title: 'CONTACT US',
      to: `${APP_MAIN_ROUTE}#contactus`,
    },
    {
      id: 'blog',
      title: 'BLOG',
      to: `${APP_MAIN_ROUTE}#blog`,
    },
  ].map(({ id, to, title }) => (
    <MenuItem eventKey={id} key={id}>
      <NavLink smooth to={to}>{title}</NavLink>
    </MenuItem>
  ));

  return (
    <Navbar fluid collapseOnSelect style={{ width: 'auto !important' }}>
      <Navbar.Header>
        <Navbar.Brand>
          <img src="/img/logo-sm.png" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          {Links}
        </Nav>
        <Nav pullRight>
          <NavItem
            className="sign-in-btn"
            eventKey={1}
            href={LOGIN_ROUTE}
          >
            {'SIGN IN'}
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

HomeNav.displayName = 'HomeNav';

export default HomeNav;
