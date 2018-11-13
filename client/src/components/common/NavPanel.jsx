import React from 'react';
import Dock from 'react-dock';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavPanel = props => (
  <Dock
    fluid
    size={window.innerWidth < 500 ? 1 : 0.3}
    isVisible={props.isVisible}
    onVisibleChange={props.onVisibleChange}
    dockStyle={{ backgroundColor: '#3bcbab' }}
  >
    <aside>
      <nav className="nav-panel">
        <header>
          <div className="nav-buttons">
            <i className="glyphicon glyphicon-remove" onClick={props.toggleNav} />
          </div>
          <img src="/img/logo-white.png" alt="EightySix Logo" />
        </header>
        <div className="nav-content">
          <div className="nav-link">
            <Link to="/customers" onClick={props.toggleNav}>
              <i className="glyphicon glyphicon-user" />
              <span>Customers</span>
            </Link>
          </div>
          <div className="nav-link">
            <Link to="/settings" onClick={props.toggleNav}>
              <i className="glyphicon glyphicon-cog" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
        <footer>
          <div className="nav-link">
            <Link to="/home" onClick={props.signOut}>
              <i className="glyphicon glyphicon-log-out" />
              <span>Logout</span>
            </Link>
          </div>
          <p>2018 © EightySix Ltd. All rights reserved.</p>
        </footer>
      </nav>
    </aside>
  </Dock>
);

NavPanel.displayName = 'NavPanel';

NavPanel.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onVisibleChange: PropTypes.func.isRequired,
  toggleNav: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default NavPanel;
