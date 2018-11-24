import React from "react";
import { clone } from "lodash";
import PropTypes from "prop-types";
import { isEmail, isEmpty, isLength } from "validator";
import {
  LENGTH_REQUIRED,
  REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_NO_NUMBER,
  INVALID_EMAIL_MSG,
  INVALID_PHONE_MSG
} from "configs/constants";

export class SignUpForm extends React.Component {
  state = {
    signUpFields: {
      email: "",
      password: "",
      phone: "",
      name: ""
    },
    verificationFields: {
      code: ""
    },
    signUpErrors: {
      email: "",
      password: "",
      phone: ""
    },
    verificationErrors: {
      code: ""
    }
  };

  onChange = ev => {
    const { value, name } = ev.target;

    if (!this.props.isSignUpVerificationCodeSent) {
      this.setState(prevState => ({
        signUpFields: {
          ...prevState.signUpFields,
          [name]: value
        },
        signUpErrors: {
          ...prevState.signUpErrors,
          [name]: this.validateSignUp(name, value)
        }
      }));
    } else {
      this.setState({
        verificationFields: {
          ...this.state.verificationFields,
          [name]: value
        },
        verificationErrors: {
          ...this.state.verificationErrors,
          [name]: this.validateCode(name, value)
        }
      });
    }
  };

  isEmptyObject = obj => {
    Object.keys(obj).every(key => obj[key] === "" || obj[key] === null);
  };

  handleSubmit = ev => {
    ev.preventDefault();

    const signUpFields = clone(this.state.signUpFields);
    const verificationFields = clone(this.state.verificationFields);
    const validationErrors = {};

    if (!this.props.isSignUpVerificationCodeSent) {
      Object.keys(signUpFields).map(name => {
        const error = this.validateSignUp(name, signUpFields[name]);
        if (error && error.length > 0) {
          validationErrors[name] = error;
        }
        return true;
      });
      if (Object.keys(validationErrors).length > 0) {
        this.setState({ signUpErrors: validationErrors });
        return;
      }
    } else {
      Object.keys(verificationFields).map(name => {
        const error = this.validateCode(name, verificationFields[name]);
        if (error && error.length > 0) {
          validationErrors[name] = error;
        }
        return true;
      });
      if (Object.keys(validationErrors).length > 0) {
        this.setState({ verificationErrors: validationErrors });
        return;
      }
    }

    if (this.props.isSignUpVerificationCodeSent) {
      this.props.onSignUpVerification({
        email: this.state.signUpFields.email,
        verificationCode: this.state.verificationFields.code
      });
    } else {
      this.props.onSignUp({
        email: this.state.signUpFields.email,
        password: this.state.signUpFields.password,
        name: this.state.signUpFields.name,
        phone: this.state.signUpFields.phone
      });
    }
  };

  validateSignUp = (name, value) => {
    switch (name) {
      case "email":
        if (isEmpty(value)) {
          return REQUIRED("Email");
        } else if (!isEmail(value)) {
          return INVALID_EMAIL_MSG;
        }
        return "";

      case "password":
        if (isEmpty(value)) {
          return REQUIRED("Password");
        } else if (!isLength(value, PASSWORD_MIN_LENGTH)) {
          return LENGTH_REQUIRED("Password", { min: PASSWORD_MIN_LENGTH });
        } else if (!/\d/.test(value)) {
          return PASSWORD_NO_NUMBER;
        }
        return "";

      case "name":
        if (isEmpty(value)) {
          return REQUIRED("Name");
        }
        return "";

      case "phone":
        if (isEmpty(value)) {
          return REQUIRED("Phone");
        } else if (!value.match(/^\+\d+$/)) {
          return INVALID_PHONE_MSG;
        }
        return "";

      case "code":
        if (isEmpty(value)) {
          return REQUIRED("Verification Code");
        }
        return "";
      default:
        return "";
    }
  };

  validateCode = (name, value) => {
    switch (name) {
      case "code":
        if (isEmpty(value)) {
          return REQUIRED("Verification Code");
        }
        return "";
      default:
        return "";
    }
  };

  render() {
    return (
      <form onSubmit={ev => this.handleSubmit(ev)} method="post">
        <img src="/img/logo.png" className="login-logo" alt="" />
        <h2 style={{ padding: "40px" }}>
          <b>Sign Up</b>
        </h2>
        <div style={{ padding: "10px" }}>
          {!this.props.isSignUpVerificationCodeSent && (
            <div>
              <div className="form-content-element">
                <label className="form-field-label" htmlFor="email">
                  Email
                  <input
                    value={this.state.signUpFields.email || ""}
                    type="email"
                    className="form-input-text-element"
                    id="email"
                    name="email"
                    placeholder="user@email.example"
                    onChange={this.onChange}
                  />
                </label>
                <p
                  className={`error-message ${!this.state.signUpErrors.email &&
                    "hidden"}`}
                >
                  {this.state.signUpErrors.email}
                </p>
              </div>
              <div className="form-content-element">
                <label className="form-field-label" htmlFor="password">
                  Password
                  <input
                    value={this.state.signUpFields.password || ""}
                    type="password"
                    className="form-input-text-element"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </label>
                <p
                  className={`error-message ${!this.state.signUpErrors
                    .password && "hidden"}`}
                >
                  {this.state.signUpErrors.password}
                </p>
              </div>
              <div className="form-content-element">
                <label className="form-field-label" htmlFor="name">
                  Name
                  <input
                    value={this.state.signUpFields.name || ""}
                    type="text"
                    className="form-input-text-element"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={this.onChange}
                  />
                </label>
                <p
                  className={`error-message ${!this.state.signUpErrors.name &&
                    "hidden"}`}
                >
                  {this.state.signUpErrors.name}
                </p>
              </div>
              <div className="form-content-element">
                <label className="form-field-label" htmlFor="phone">
                  Phone
                  <input
                    value={this.state.signUpFields.phone || ""}
                    type="text"
                    className="form-input-text-element"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={this.onChange}
                  />
                </label>
                <p
                  className={`error-message ${!this.state.signUpErrors.phone &&
                    "hidden"}`}
                >
                  {this.state.signUpErrors.phone}
                </p>
              </div>
            </div>
          )}
          {this.props.isSignUpVerificationCodeSent && (
            <div className="form-content-element">
              <label className="form-field-label" htmlFor="code">
                Verification Code
                <input
                  value={this.state.verificationFields.code || ""}
                  type="text"
                  className="form-input-text-element"
                  id="code"
                  name="code"
                  placeholder="Verification Code"
                  onChange={this.onChange}
                />
              </label>
              <p
                className={`error-message ${!this.state.verificationErrors
                  .code && "hidden"}`}
              >
                {this.state.verificationErrors.code}
              </p>
            </div>
          )}
          <div className="form-content-element">
            <button
              className="form-button-elementSuccess form-button-element"
              type="submit"
            >
              <span className="form-button-content">
                <span>Submit</span>
              </span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

SignUpForm.displayName = "SignUpForm";

SignUpForm.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  onSignUpVerification: PropTypes.func.isRequired,
  isSignUpVerificationCodeSent: PropTypes.bool.isRequired
};

export default SignUpForm;
