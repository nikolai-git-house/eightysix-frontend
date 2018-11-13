import React from 'react';
import {
  Blog,
  Contact,
  Footer,
  Hero,
  HomeNav,
  HowItWorks,
  Partners,
  Services,
} from 'components/core';

const Home = () => (
  <section className="home-element">
    <header className="header">
      <HomeNav />
    </header>
    <section className="home-content">
      <Hero />
      <Services />
      <Partners />
      <HowItWorks />
      <Contact />
      <Blog />
      <Footer />
    </section>
  </section>
);

export default Home;
