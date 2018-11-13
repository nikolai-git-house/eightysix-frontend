import React from 'react';
import { connect } from 'react-redux';
import { selector } from 'apps/services';
import * as Pages from 'apps/pages/index';
import { Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header, Footer, PrivateRoute } from 'components/common';
import { attemptGetCustomer } from 'apps/modules/customerProfile/CustomerProfileActions';
import { toggleSearch } from 'apps/modules/app/AppActions';

class CustomerProfile extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.attemptGetCustomer(id);
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <Header
          match={match}
          toggleSearch={this.props.toggleSearch}
        />
        <Switch>
          <PrivateRoute exact path={`${match.path}/products`} component={Pages.CustomerProducts} name="products" />
          <PrivateRoute exact path={`${match.path}/notes`} component={Pages.CustomerNotes} name="notes" />
          <PrivateRoute exact path={`${match.path}/history`} component={Pages.CustomerTransactions} name="history" />
          <PrivateRoute component={() => (<Redirect to={`${match.path}/products`} />)} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

CustomerProfile.displayName = 'CustomerProfile';

CustomerProfile.propTypes = {
  attemptGetCustomer: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  match: PropTypes.shape.isRequired,
};

const mapStateToProps = state => selector(state);

const mapDispatchToProps = dispatch => ({
  attemptGetCustomer: data => dispatch(attemptGetCustomer(data)),
  toggleSearch: data => dispatch(toggleSearch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);
