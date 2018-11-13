import React from 'react';
import PropTypes from 'prop-types';
import { isEmail, isEmpty, isLength } from 'validator';
import {
  LENGTH_REQUIRED,
  REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_NO_NUMBER,
  INVALID_EMAIL_MSG,
} from 'configs/constants';

export class ResetPasswordForm extends React.Component {
  state = {
    fields: {
      email: '',
      newpassword: '',
      verificationcode: '',
    },
    errors: {
      email: '',
      newpassword: '',
      verificationcode: '',
    },
  };

  onChange = (ev) => {
    const { value, name } = ev.target;

    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [name]: value,
      },
      errors: {
        [name]: this.validate(name, value),
      },
    }));
  }

  isEmptyObject = obj => Object.keys(obj).every(key => obj[key] === '' || obj[key] === null);

  handleSubmit = (ev) => {
    ev.preventDefault();

    if (this.isEmptyObject(this.state.errors)) {
      if (this.props.isResetPasswordVerificationCodeSent) {
        this.props.onSetNewPassword(this.state.fields);
      } else {
        this.props.onRequestPasswordReset({
          email: this.state.fields.email,
        });
      }
    }
  }

  validate = (name, value) => {
    switch (name) {
      case 'email':
        if (isEmpty(value)) {
          return REQUIRED('Email');
        } else if (!isEmail(value)) {
          return INVALID_EMAIL_MSG;
        }
        return '';

      case 'newpassword':
        if (isEmpty(value)) {
          return REQUIRED('Password');
        } else if (!isLength(value, PASSWORD_MIN_LENGTH)) {
          return LENGTH_REQUIRED('Password', { min: PASSWORD_MIN_LENGTH });
        } else if (!/\d/.test(value)) {
          return PASSWORD_NO_NUMBER;
        }
        return '';

      case 'verificationcode':
        if (isEmpty(value)) {
          return REQUIRED('Verification Code');
        }
        return '';

      default:
        return '';
    }
  }

  render() {
    return (
      <form onSubmit={ev => this.handleSubmit(ev)} method="post">
        <img src="/img/logo.png" className="login-logo" alt="" />
        <h2 style={{ padding: '40px' }}>{!this.props.isResetPasswordVerificationCodeSent ? <b>Forgot Password</b> : <b>Enter Verification Code</b>}</h2>
        <div style={{ padding: '10px' }}>
          { !this.props.isResetPasswordVerificationCodeSent &&
          <div className="form-content-element">
            <label className="form-field-label" htmlFor="email">Email
              <input value={this.state.fields.email || ''} type="email" className="form-input-text-element" id="email" name="email" placeholder="user@email.example" onChange={this.onChange} />
            </label>
            <p className={`error-message ${!this.state.errors.email && 'hidden'}`}>{this.state.errors.email}</p>
          </div> }
          { this.props.isResetPasswordVerificationCodeSent &&
          <div>
            <div className="form-content-element">
              <label className="form-field-label" htmlFor="verificationcode">Verification Code
                <input value={this.state.fields.verificationcode || ''} type="text" className="form-input-text-element" id="verificationcode" name="verificationcode" placeholder="verification code" onChange={this.onChange} />
              </label>
              <p className={`error-message ${!this.state.errors.verificationcode && 'hidden'}`}>{this.state.errors.verificationvode}</p>
            </div>
            <div className="form-content-element">
              <label className="form-field-label" htmlFor="password">New Password
                <input value={this.state.fields.newpassword || ''} type="password" className="form-input-text-element" id="newpassword" name="newpassword" placeholder="new password" onChange={this.onChange} />
              </label>
              <p className={`error-message ${!this.state.errors.newpassword && 'hidden'}`}>{this.state.errors.newpassword}</p>
            </div>
          </div> }
          <div className="form-content-element">
            <button className="form-button-elementSuccess form-button-element" type="submit">
              <span className="form-button-content"><span>Submit</span></span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

ResetPasswordForm.displayName = 'PasswordResetForm';

ResetPasswordForm.propTypes = {
  onSetNewPassword: PropTypes.func.isRequired,
  onRequestPasswordReset: PropTypes.func.isRequired,
  isResetPasswordVerificationCodeSent: PropTypes.bool.isRequired,
};

export default ResetPasswordForm;
