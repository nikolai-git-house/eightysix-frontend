import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ID_TOKEN, LOGIN_ROUTE } from 'configs/constants';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem(ID_TOKEN)
        ? <Component {...props} />
        : <Redirect to={LOGIN_ROUTE} />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
