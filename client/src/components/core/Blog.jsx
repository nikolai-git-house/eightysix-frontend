import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { APP_MAIN_ROUTE } from 'configs/constants';

const Blog = () => (
  <div className="blog-element" id="blog">
    <p className="blog-top" />
    <hr className="full-divider" />
    <p className="blog-titleBig">
      { 'BLOG' }
    </p>
    <p className="blog-title">
      { 'Information should be bite-sized and relevant' }
    </p>
    <p className="blog-titleSmall blue-title">
      { 'See the latest posts from our new blog' }
    </p>
    <div className="blogs">
      <div className="blog50">
        <img src="/img/blog-1.jpg" className="blog" alt="Article 1" />
      </div>
      <div className="blog50">
        <img src="/img/blog-2.jpg" className="blog" alt="Article 2" />
      </div>
      <div className="blog30">
        <img src="/img/blog-3.jpg" className="blog" alt="Article 3" />
      </div>
      <div className="blog30">
        <img src="/img/blog-4.jpg" className="blog" alt="Article 4" />
      </div>
      <div className="blog30">
        <img src="/img/blog-5.jpg" className="blog" alt="Article 5" />
      </div>
    </div>
    <div className="up-arrow footer-arrow">
      <HashLink smooth to={`${APP_MAIN_ROUTE}#login`}>
        <i className="fa fa-chevron-up up-arrow" />
      </HashLink>
    </div>
  </div>
);

Blog.displayName = 'Blog';

export default Blog;
