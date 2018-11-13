import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selector } from '../../app/services';

class Header extends Component {
  static pageTitle(path, customer) {
    switch (path) {
      case '/customers':
        return (
          <span className="navbar-title">
            {'CUSTOMERS'}
          </span>
        );
      case '/settings':
        return (
          <span className="navbar-title">
            {'SETTINGS'}
          </span>
        );
      default:
        return (
          <div>
            <span className="navbar-code pad-right-menu-item">
              {customer.code}
            </span>
            <span className="navbar-title pad-left-menu-item truncate-text" >
              {customer.title}
            </span>
          </div>
        );
    }
  }

  leftButton(path) {
    if (path.includes('/customer/:id')) {
      return (
        <Link className="navbar-btn" to="/customers">
          <i className="glyphicon glyphicon-chevron-left" />
        </Link>
      );
    }
    const { toggleNav } = this.props;
    return (
      <button className="navbar-btn" onClick={() => toggleNav()} >
        <i className="glyphicon glyphicon-menu-hamburger" />
      </button>
    );
  }

  render() {
    const customer = this.props.customerProfile.get('customer').toJS();
    const { toggleSearch, match: { path } } = this.props;
    return (
      <Navbar>
        <Nav>
          <NavItem>
            {this.leftButton(path)}
          </NavItem>
          <NavItem style={{ width: '50px' }}>
            {Header.pageTitle(path, customer)}
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem>
            <button className="navbar-btn" onClick={() => toggleSearch()}>
              <i className="glyphicon glyphicon-search" />
            </button>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

Header.displayName = 'Header';

Header.defaultProps = {
  toggleNav: () => null,
};

Header.propTypes = {
  toggleSearch: PropTypes.func.isRequired,
  toggleNav: PropTypes.func,
  customerProfile: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
};

const mapStateToProps = state => selector(state, false, ['customerProfile']);

export default connect(mapStateToProps)(Header);
