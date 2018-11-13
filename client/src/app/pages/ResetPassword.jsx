import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { ResetPasswordForm } from 'components/core';
import { attemptRequestPasswordReset, attemptSetNewPassword } from '../modules/authorisation/AuthActions';
import { selector } from '../services';

export const ResetPassword = (props) => {
  const isResetPasswordVerificationCodeSent = props.auth.getIn(['fields', 'isResetPasswordVerificationCodeSent']);
  const message = props.auth.get('message').toJS();
  return (
    <div className="login-page">
      <div className="sign-in-wrapper">
        <Row className="sign-in-row row">
          <div className="sign-in-content text-center pull-left col-xs-12 sign-in-box">
            <ResetPasswordForm
              onRequestPasswordReset={props.attemptRequestPasswordReset}
              onSetNewPassword={props.attemptSetNewPassword}
              isResetPasswordVerificationCodeSent={isResetPasswordVerificationCodeSent}
            />
            <p className={`login-error error-message ${!message.type && 'hidden'}`}>{message.text}</p>
            <Link to="/login">
              <p>Back to login</p>
            </Link>
          </div>
        </Row>
      </div>
    </div>
  );
};

ResetPassword.displayName = 'ResetPassword';

ResetPassword.propTypes = {
  attemptRequestPasswordReset: PropTypes.func.isRequired,
  attemptSetNewPassword: PropTypes.func.isRequired,
  auth: PropTypes.shape.isRequired,
};

const mapStateToProps = state => selector(state, false, ['authorisation', 'loading']);

const mapDispatchToProps = dispatch => ({
  attemptRequestPasswordReset: data => dispatch(attemptRequestPasswordReset(data)),
  attemptSetNewPassword: data => dispatch(attemptSetNewPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
