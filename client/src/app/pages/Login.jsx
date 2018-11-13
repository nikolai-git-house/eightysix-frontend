import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { LoginForm } from 'components/core';
import {
  CUSTOMER_INDEX_ROUTE,
  ID_TOKEN,
  USER_ID,
} from 'configs/constants';
import { attemptSignIn, refreshUser } from '../modules/authorisation/AuthActions';
import { selector } from '../services';

class Login extends React.Component {
  componentWillMount() {
    const idToken = localStorage.getItem(ID_TOKEN);
    const userId = localStorage.getItem(USER_ID);
    if (idToken !== null && userId !== null) {
      this.props.history.push(CUSTOMER_INDEX_ROUTE);
    }
  }

  render() {
    const message = this.props.auth.get('message').toJS();
    return (
      <div className="login-page">
        <div className="sign-in-wrapper">
          <Row className="sign-in-row">
            <div className="sign-in-content text-center pull-left col-xs-12 sign-in-box">
              <LoginForm signIn={this.props.attemptSignIn} />
              <p className={`login-error error-message ${!message.type && 'hidden'}`}>{message.text}</p>
              <Link to="/password-reset">
                <p>Forgot your password?</p>
              </Link>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

Login.displayName = 'Login';

Login.propTypes = {
  attemptSignIn: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
  auth: PropTypes.shape.isRequired,
};

const mapStateToProps = state => selector(state, false, ['app', 'authorisation']);

const mapDispatchToProps = dispatch => ({
  attemptSignIn: data => dispatch(attemptSignIn(data)),
  refreshUser: data => dispatch(refreshUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
