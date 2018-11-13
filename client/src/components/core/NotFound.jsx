import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { APP_MAIN_ROUTE } from 'configs/constants';

const NotFound = () => (
  <div className="fixed-center">
    <Col xs={12} className="logoWrapper col-xs-12">
      <Link to={APP_MAIN_ROUTE}>
        <img className="img-responsive box-center" src="/img/logo-big.png" alt="logo" />
      </Link>
    </Col>
    <div className="ui text">
      <h1 className="ui header">
        Not Found
      </h1>
    </div>
  </div>
);

export default NotFound;
