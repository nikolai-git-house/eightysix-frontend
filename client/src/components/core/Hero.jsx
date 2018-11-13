import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { APP_MAIN_ROUTE } from 'configs/constants';

const Hero = () => (
  <article className="hero-element" id="login">
    <div className="hero-content">
      <p className="hero-title">
        <span className="hero-logo" />
      </p>
      <p className="hero-title">
        { 'BECAUSE SOME CUSTOMERS WON\'T RETURN'}
      </p>
      <p className="hero-title">
        { 'FIND ' }
        <span className="blue-title">DEPARTING</span>
        { 'SALES, AND BRING THEM ' }
        <span className="blue-title">BACK</span>
      </p>
    </div>
    <div className="up-arrow">
      <HashLink smooth to={`${APP_MAIN_ROUTE}#login`}>
        <i className="fa fa-chevron-up up-arrow" />
      </HashLink>
    </div>
    <div className="hero-top" />
  </article>
);

Hero.displayName = 'Hero';

export default Hero;
