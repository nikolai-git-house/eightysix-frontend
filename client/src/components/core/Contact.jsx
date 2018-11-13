import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { APP_MAIN_ROUTE } from 'configs/constants';

const Contact = () => (
  <div className="contact-element" id="contactus">
    <hr className="full-divider" />
    <p className="titleBigMain">
      { 'THIS IS COMPETING AT THE NEXT LEVEL' }
    </p>
    <p className="titleBig blue-title titleWithLogo">
      { 'TAKE YOUR MARK WITH ' }
      <span className="blue-title">EIGHTYSIX</span>
    </p>
    <div className="form">
      <form>
        <div className="form-content-element">
          <label className="form-field-label" htmlFor="name">Name
            <input
              type="text"
              className="form-input-text-element"
              id="name"
              name="name"
              placeholder="Your Name"
              value=""
            />
          </label>
        </div>
        <div className="form-content-element">
          <label className="form-field-label" htmlFor="email">Email
            <input
              type="email"
              className="form-input-text-element"
              id="email"
              name="email"
              placeholder="user@email.example"
              value=""
            />
          </label>
        </div>
        <div className="form-content-element">
          <label className="form-field-label" htmlFor="business">Business sector
            <input
              type="text"
              className="form-input-text-element"
              id="business"
              name="business"
              placeholder="Business sector"
              value=""
            />
          </label>
        </div>
        <div className="form-content-element">
          <label className="form-field-label" htmlFor="message">Message
            <textarea
              className="form-input-text-element"
              id="message"
              name="message"
              rows="5"
              type="textarea"
            />
          </label>
        </div>
        <div className="form-content-element">
          <button className="form-button-contact-elementSuccess search-form-button" type="submit">
            <span className="form-button-content"><span>Submit</span></span>
          </button>
        </div>
      </form>
    </div>
    <div className="up-arrow">
      <HashLink smooth to={`${APP_MAIN_ROUTE}#login`}>
        <i className="fa fa-chevron-up up-arrow" />
      </HashLink>
    </div>
  </div>
);

Contact.displayName = 'Contact';

export default Contact;
