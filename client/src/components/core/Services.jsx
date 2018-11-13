import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { APP_MAIN_ROUTE } from 'configs/constants';

const Services = () => (
  <article className="services-element" id="services">
    <hr className="full-divider" />
    <p className="aboutTitle">{'WHOLESALE AND DISTRIBUTION IS '}
      <span className="blue-title">RUTHLESS</span>
    </p>
    <p className="descriptionBlue aboutDescription">
      {'Margins are constantly squeezed and competition is rife'}<br />
    </p>
    <p className="aboutDescription">
      {'As customer loyalty becomes less and less,'}<br />
    </p>
    <p className="descriptionBlue aboutDescription">
      {'how do you retain business?'}
    </p>
    <div className="services-content">
      <div className="benifit">
        <div className="benifitImageOne" />
        <p className="services-title">
          { 'KNOW HOW QUICKLY CUSTOMERS' }
        </p>
        <p className="services-title">
          { 'ARE CONSUMING PRODUCTS' }
        </p>
        <p className="benifitTitleSmall">
          { 'EightySix analyses your customer\'s orders and accurately' }
        </p>
        <p className="benifitTitleSmall">
          { 'calculates how quickly they will consume your products' }
        </p>
        <hr className="benifitDivider" />
      </div>
      <div className="benifit">
        <div className="benifitImageTwo" />
        <p className="services-title">
          { 'MONITOR WHICH CUSTOMERS' }
        </p>
        <p className="services-title">
          { 'ARE OVERDUE AN ORDER' }
        </p>
        <p className="benifitTitleSmall">
          { 'Customers taking longer than expected to return are quickly' }
        </p>
        <p className="benifitTitleSmall">
          { 'highlighted to point out likely departing sales' }
        </p>
        <hr className="benifitDivider" />
      </div>
      <div className="benifit">
        <div className="benifitImageThree" />
        <p className="services-title">
          { 'REDIRECT YOUR TIME AND' }
        </p>
        <p className="services-title">
          { 'WIN BACK CUSTOMERS' }
        </p>
        <p className="benifitTitleSmall">
          { 'Respond immediately to slow returning business and' }
        </p>
        <p className="benifitTitleSmall">
          { 'make sure your customers are staying with you' }
        </p>
        <hr className="benifitDivider" />
      </div>
      <div className="tagLine">
        <p className="titleBigLogo">
          <span className="blue-title">EIGHTYSIX</span>
          { 'QUICKLY FINDS DEPARTING' }
        </p>
        <p className="titleBig">
          { 'REPEAT SALES, GIVING YOU THE CHANCE' }
        </p>
        <p className="titleBig">
          { 'TO WIN THEM BACK BEFORE THEY LEAVE' }
        </p>
      </div>
    </div>
    <div className="up-arrow">
      <HashLink smooth to={`${APP_MAIN_ROUTE}#login`}>
        <i className="fa fa-chevron-up up-arrow" />
      </HashLink>
    </div>
  </article>
);

Services.displayName = 'Services';

export default Services;
