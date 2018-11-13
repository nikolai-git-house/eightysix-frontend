import React from 'react';
import PropTypes from 'prop-types';
import { isEmail, isEmpty, isLength } from 'validator';
import { Link } from 'react-router-dom';

import {
  LENGTH_REQUIRED,
  REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_NO_NUMBER,
  INVALID_EMAIL_MSG,
} from 'configs/constants';

export class LoginForm extends React.Component {
  state = {
    fields: {
      email: '',
      password: '',
    },
    errors: {
      email: '',
      password: '',
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
  };

  isEmptyObject = obj => Object.keys(obj).every(key => obj[key] === '' || obj[key] === null)

  handleSubmit = (ev) => {
    ev.preventDefault();

    if (this.isEmptyObject(this.state.errors)) {
      this.props.signIn({
        email: this.state.fields.email,
        password: this.state.fields.password,
      });
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

      case 'password':
        if (isEmpty(value)) {
          return REQUIRED('Password');
        } else if (!isLength(value, PASSWORD_MIN_LENGTH)) {
          return LENGTH_REQUIRED('Password', { min: PASSWORD_MIN_LENGTH });
        } else if (!/\d/.test(value)) {
          return PASSWORD_NO_NUMBER;
        }
        return '';

      default:
        return '';
    }
  }

  render = () => (
    <form onSubmit={ev => this.handleSubmit(ev)} method="post">
      <img src="/img/logo.png" className="login-logo" alt="logo" />
      <h2 style={{ padding: '40px' }}><b>Sign in</b></h2>
      <p style={{ padding: '10px' }}>Need a EightySix account?</p>
      <Link to="/sign-up">
        <p>Create an account</p>
      </Link>
      <div style={{ padding: '10px' }}>
        <div>
          <div className="form-content-element">
            <label className="form-field-label" htmlFor="email">Email
              <input value={this.state.fields.email || ''} type="email" className="form-input-text-element" id="email" name="email" placeholder="user@email.example" onChange={this.onChange} />
            </label>
            <p className={`error-message ${!this.state.errors.email && 'hidden'}`}>{this.state.errors.email}</p>
          </div>
          <div className="form-content-element">
            <label className="form-field-label" htmlFor="password">Password
              <input value={this.state.fields.password || ''} type="password" className="form-input-text-element" id="password" name="password" placeholder="password" onChange={this.onChange} />
            </label>
            <p className={`error-message ${!this.state.errors.password && 'hidden'}`}>{this.state.errors.password}</p>
          </div>
        </div>
        <div className="form-content-element">
          <button className="form-button-elementSuccess form-button-element" type="submit">
            <span className="form-button-content"><span>Submit</span></span>
          </button>
        </div>
      </div>
    </form>
  );
}

LoginForm.displayName = 'LoginForm';

LoginForm.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default LoginForm;
