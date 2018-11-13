import React from 'react';

const Footer = () => (
  <footer className="footer-element">
    <hr className="full-divider" />
    <img src="/img/logo.png" className="footer-logo" alt="Footer Logo" />
    <aside className="copyright">
      { 'Copyright © 2018 EightySix Limited. All rights reserved. | Privacy | Terms of Use | Cookies' }
    </aside>
  </footer>
);

Footer.displayName = 'Footer';

export default Footer;
