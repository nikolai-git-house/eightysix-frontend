import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import moment from 'moment';
import Waypoint from 'react-waypoint';
import { BeatLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { DEFAULT_OFFSET_VALUE, DEFAULT_LIMIT_VALUE } from 'configs/constants';
import { selector } from 'apps/services';
import { attemptGetHistory, attemptGetCustomer } from 'apps/modules/customerTransactions/CustomerTransactionsActions';
import { purgeUser } from 'apps/modules/authorisation/AuthActions';
import { toggleSearch } from 'apps/modules/app/AppActions';
import { SearchPanel, SearchForm } from 'components/common';
import { OrderDetail, ButtonNavBar } from 'components/core';

class OrderHistory extends Component {
  state = {
    searchTitle: '',
    searchCode: '',
  }

  componentDidMount() {
    const { id: customerId } = this.props.match.params;
    this.props.attemptGetHistory({
      customerId,
      limit: DEFAULT_LIMIT_VALUE,
      offset: DEFAULT_OFFSET_VALUE,
    });
  }

  onChange(ev) {
    const { value, name } = ev.target;
    this.setState({ [name]: value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { searchTitle, searchCode } = this.state;
    const { id: customerId } = this.props.match.params;
    this.props.attemptGetHistory({
      customerId,
      searchTitle,
      searchCode,
      offset: DEFAULT_OFFSET_VALUE,
      limit: DEFAULT_LIMIT_VALUE,
    });
    this.props.toggleSearch();
  }

  clearFilter() {
    this.setState({ searchTitle: '', searchCode: '' });
  }

  nextTransactions(orders) {
    const { id: customerId } = this.props.match.params;
    const { searchCode, searchTitle } = this.state;
    if (orders.length > 0) {
      this.props.attemptGetHistory({
        customerId,
        offset: orders.length,
        limit: DEFAULT_LIMIT_VALUE,
        searchTitle,
        searchCode,
      });
    }
  }

  render() {
    const { searchTitle, searchCode } = this.state;
    const { match, toggleSearch } = this.props;
    const customer = this.props.customerProfile.get('customer').toJS();
    const orders = this.props.customerTransactions.get('orders').toJS();
    const showSearch = this.props.app.get('showSearch');
    const loading = this.props.app.get('loading');
    const tableDimensions = {
      delivered: 200,
      totalValue: 200,
    };
    const columns = [
      {
        expander: true,
        Expander: ({ isExpanded }) => (
          <div>
            {isExpanded
              ? <span>&#x2299;</span>
              : <span>&#x2295;</span>}
          </div>
        ),
        style: {
          cursor: 'pointer',
          fontSize: 25,
          padding: '0',
          textAlign: 'center',
          userSelect: 'none',
        },
      },
      {
        Header: () => <span>Date</span>,
        accessor: 'delivered',
        minWidth: tableDimensions.delivered,
        Cell: row => (
          <div>
            <span>{moment(row.value).format('DD MMMM, YYYY')}</span>
          </div>
        ),
        PivotValue: ({ value }) => (
          <div>
            <span>{value}</span>
          </div>
        ),
      },
      {
        Header: () => <span>Value</span>,
        accessor: 'totalValue',
        minWidth: tableDimensions.totalValue,
        style: { borderRight: 'none' },
        Cell: row => (
          <div>
            <span>{ row.value === null ? 0 : row.value } { customer.currency }</span>
          </div>
        ),
      },
    ];

    const searchFields = {
      fields: [{
        id: 1,
        label: 'Product Description',
        name: 'searchTitle',
        placeholder: 'Description',
        value: searchTitle,
      },
      {
        id: 2,
        label: 'Product Code',
        name: 'searchCode',
        placeholder: 'Code',
        value: searchCode,
      }],
    };

    return (
      <div>
        <ButtonNavBar id={match.params.id} />
        <ReactTable
          data={orders}
          columns={columns}
          className={orders.length === 0 && 'table-no-data'}
          SubComponent={row => (
            <OrderDetail data={row.original.items} currency={customer.currency} />
          )}
          onSortedChange={newSorted => this.sort(newSorted[0])}
          manual
          showPagination={false}
          getTableProps={(state, rowInfo, column, instance) => ({
            style: {
              minWidth: `${
                (instance.padding * 2)
                + tableDimensions.delivered
                + tableDimensions.totalValue
              }`,
            },
          })}
          getTrGroupProps={(state, rowInfo) => (
            !rowInfo ? { className: 'hidden' } : {}
          )}
        />
        <div className={loading ? 'spinner' : 'hidden'}>
          <BeatLoader color="#529d8f" loading={loading} />
        </div>
        <div className="waypoint">
          <Waypoint
            onEnter={() => this.nextTransactions(orders)}
            threshold={0}
          />
        </div>
        <SearchPanel
          isVisible={showSearch}
          onVisibleChange={toggleSearch}
        >
          <SearchForm
            togglePanel={toggleSearch}
            clearFilter={() => this.clearFilter()}
            onChange={ev => this.onChange(ev)}
            onSubmit={ev => this.onSubmit(ev)}
            search={searchFields}
          />
        </SearchPanel>
      </div>
    );
  }
}

OrderHistory.displayName = 'OrderHistory';

OrderHistory.propTypes = {
  match: PropTypes.shape,
  toggleSearch: PropTypes.func,
  attemptGetHistory: PropTypes.func,
  customerProfile: PropTypes.shape,
  customerTransactions: PropTypes.shape,
  app: PropTypes.shape,
};

const mapStateToProps = state => selector(state, false, ['app', 'customerProfile', 'customerTransactions']);

const mapDispatchToProps = dispatch => ({
  attemptGetCustomer: data => dispatch(attemptGetCustomer(data)),
  attemptGetHistory: data => dispatch(attemptGetHistory(data)),
  purgeUser: () => dispatch(purgeUser()),
  toggleSearch: data => dispatch(toggleSearch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
