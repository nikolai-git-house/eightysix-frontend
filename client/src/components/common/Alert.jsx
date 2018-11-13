import React from 'react';
import PropTypes from 'prop-types';

const Alert = props => (
  <div>
    {props.type !== undefined
      && <div className={`${props.message.type}-alert`}>{props.message.text}</div>}
    {props.children}
  </div>
);

Alert.displayName = 'Alert';

Alert.defaultProps = {
  type: undefined,
  message: {
    type: 'error',
    text: 'Error with Alert component',
  },
};

Alert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.shape,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Alert;
