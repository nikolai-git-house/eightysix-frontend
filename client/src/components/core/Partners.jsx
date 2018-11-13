import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { APP_MAIN_ROUTE } from 'configs/constants';

const Partners = () => (
  <article className="partners-element" id="partners">
    <hr className="full-divider" />
    <div className="tagLineBig">
      <p className="partners-titleBig">
        { 'STRATEGIC' }
      </p>
      <p className="partners-titleBigBlue">
        { 'PARTNERS' }
      </p>
      <p className="partners-title">
        <span className="blue-title">EIGHTYSIX</span>
        { 'IS PROUD TO ' }
        <span className="blue-title">WORK ALONGSIDE</span>
      </p>
    </div>
    <div className="clients">
      <div className="partners-content">
        <div className="clientDiv">
          <img src="/img/dhl.png" alt="DHL Logo" />
        </div>
        <div className="clientDiv">
          <img src="/img/unilever.png" alt="Unilever Logo" />
        </div>
        <div className="clientDiv">
          <img src="/img/bayer.png" alt="Bayer Logo" />
        </div>
        <div className="clientDiv">
          <img src="/img/nestle.png" alt="Nestle Logo" />
        </div>
      </div>
    </div>
    <div className="up-arrow">
      <HashLink smooth to={`${APP_MAIN_ROUTE}#login`}>
        <i className="fa fa-chevron-up up-arrow" />
      </HashLink>
    </div>
  </article>
);

Partners.displayName = 'Partners';

export default Partners;
