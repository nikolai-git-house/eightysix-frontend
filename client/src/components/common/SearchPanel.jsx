import React from 'react';
import Dock from 'react-dock';
import PropTypes from 'prop-types';

const SearchPanel = props => (
  <Dock
    fluid
    position="right"
    size={window.innerWidth < 500 ? 1 : 0.3}
    isVisible={props.isVisible}
    onVisibleChange={props.onVisibleChange}
    dockStyle={{ backgroundColor: '#3bcbab' }}
  >
    {props.children}
  </Dock>
);

SearchPanel.displayName = 'SearchPanel';

SearchPanel.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onVisibleChange: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default SearchPanel;
