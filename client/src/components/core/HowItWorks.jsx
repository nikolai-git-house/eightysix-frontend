import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { APP_MAIN_ROUTE } from 'configs/constants';

const HowItWorks = () => (
  <div className="howitworks-element" id="howitworks">
    <p className="top" />
    <hr className="full-divider" />
    <p className="titleBig">
      { 'WE FIND DEPARTING BUSINESS ' }
      <span className="blue-title">BEFORE IT LEAVES</span>
    </p>
    <p className="titleSmall">{'Try our services and keep your customer\'s loyal'}</p>
    <div className="services">
      <div className="service">
        <img src="/img/connect.jpg" alt="Connect" />
        <p className="title">CONNECT</p>
        <p className="description">
          {'With one easy install, you connect to our services. '}
          {'We work seamlessly alongside your existing software tools with no need for maintenance. '}
          {'Setup once and forget'}
        </p>
      </div>
      <div className="service">
        <img src="/img/find.jpg" alt="Find" />
        <p className="title">FIND</p>
        <p className="description">
          {'One connected, we immediately start understanding your customer\'s ordering behaviour. '}
          {'Vulnerable sales lines become visible as we highlight any concerning business'}
        </p>
      </div>
      <div className="service">
        <img src="/img/repeat.jpg" alt="Repeat" />
        <p className="title">REPEAT</p>
        <p className="description">
          {'Recognise slow returning orders early and quickly reach out to re-establish the relationship. '}
          {'Ensure that your repeat business keeps coming back'}
        </p>
      </div>
    </div>
    <div className="up-arrow">
      <HashLink smooth to={`${APP_MAIN_ROUTE}#login`}>
        <i className="fa fa-chevron-up up-arrow" />
      </HashLink>
    </div>
  </div>
);

HowItWorks.displayName = 'HowItWorks';

export default HowItWorks;
