import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SignUpForm } from 'components/core';
import { attemptSignUp, attemptSignUpVerification } from '../modules/authorisation/AuthActions';
import { selector } from '../services';

export const SignUp = (props) => {
  const isSignUpVerificationCodeSent = props.auth.getIn(['fields', 'isSignUpVerificationCodeSent']);
  const message = props.auth.get('message').toJS();
  return (
    <div className="login-page">
      <div className="sign-in-wrapper">
        <Row className="sign-in-row row">
          <div className="sign-in-content text-center pull-left col-xs-12 sign-in-box">
            <SignUpForm
              onSignUp={props.attemptSignUp}
              onSignUpVerification={props.attemptSignUpVerification}
              isSignUpVerificationCodeSent={isSignUpVerificationCodeSent}
            />
            <p className={`login-error error-message ${!message.type && 'hidden'}`}>
              {message.text}
            </p>
            <Link to="/login">
              <p>Back to login</p>
            </Link>
          </div>
        </Row>
      </div>
    </div>
  );
};

SignUp.displayName = 'SignUp';

SignUp.propTypes = {
  attemptSignUp: PropTypes.func.isRequired,
  attemptSignUpVerification: PropTypes.func.isRequired,
  auth: PropTypes.shape.isRequired,
};

const mapStateToProps = state => selector(state, false, ['authorisation', 'loading']);

const mapDispatchToProps = dispatch => ({
  attemptSignUp: data => dispatch(attemptSignUp(data)),
  attemptSignUpVerification: data => dispatch(attemptSignUpVerification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
