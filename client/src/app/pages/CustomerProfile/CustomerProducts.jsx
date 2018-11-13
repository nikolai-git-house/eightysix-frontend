import React, { Component } from 'react';
import ReactTable from 'react-table';
import { BeatLoader } from 'react-spinners';
import Waypoint from 'react-waypoint';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import { selector } from 'apps/services';
import { connect } from 'react-redux';
import { DEFAULT_OFFSET_VALUE, DEFAULT_LIMIT_VALUE } from 'configs/constants';
import { attemptGetProducts, attemptShowHideProduct } from 'apps/modules/customerProducts/CustomerProductsActions';
import { attemptGetCustomer, showOverDueAction } from 'apps/modules/customerProfile/CustomerProfileActions';
import { purgeUser } from 'apps/modules/authorisation/AuthActions';
import { toggleSearch } from 'apps/modules/app/AppActions';
import { SearchPanel, SearchForm, SortableColumn } from 'components/common';
import { ButtonNavBar } from 'components/core';

class CustomerProducts extends Component {
  state = {
    searchTitle: '',
    searchCode: '',
    sortBy: 'month_value',
    descending: true,
    overdue: true,
  }

  componentDidMount() {
    this.clearFilter();
    const { sortBy, descending, overdue } = this.state;
    const { id: customerId } = this.props.match.params;
    this.props.attemptGetProducts({
      customerId,
      overdue,
      sortBy,
      descending,
      offset: DEFAULT_OFFSET_VALUE,
      limit: DEFAULT_LIMIT_VALUE,
    });
  }

  onChange(ev) {
    const { value, name } = ev.target;
    this.setState({ [name]: value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const {
      searchTitle, searchCode, sortBy, descending, overdue,
    } = this.state;
    const { customerId } = this.props.match.params;
    this.props.attemptGetProducts({
      customerId,
      searchTitle,
      searchCode,
      offset: DEFAULT_OFFSET_VALUE,
      limit: DEFAULT_LIMIT_VALUE,
      sortBy,
      descending,
      overdue,
    });
    this.props.toggleSearch();
  }

  getBackground = (row) => {
    const { overdue } = this.state;
    if (!overdue) return { background: 'white' };
    const duration = moment().diff(moment(row.last_delivered), 'days');
    const opacity = (duration - row.period) / (row.outlier - row.period).toFixed(2);
    return { background: `rgba(138, 236, 223, ${opacity})` };
  }

  nextProducts(products) {
    const { id: customerId } = this.props.match.params;
    const {
      searchCode, searchTitle, sortBy, descending, overdue,
    } = this.state;
    if (products.length > 0) {
      this.props.attemptGetProducts({
        customerId,
        overdue,
        sortBy,
        descending,
        offset: products.length,
        limit: DEFAULT_LIMIT_VALUE,
        searchTitle,
        searchCode,
      });
    }
  }

  clearFilter() {
    this.setState({ searchTitle: '', searchCode: '' });
  }

  sort = () => {
    this.setState((prevState, props) => {
      const { sortBy, descending, overdue } = prevState;
      const { id: customerId } = props.match.params;
      this.props.attemptGetProducts({
        customerId,
        overdue,
        sortBy,
        descending,
        limit: DEFAULT_LIMIT_VALUE,
        offset: DEFAULT_OFFSET_VALUE,
      });
      return { sortBy, descending };
    });
  }

  toggleOverdue = () => {
    this.setState((prevState, props) => {
      const { sortBy, descending, overdue } = prevState;
      const { id } = props.match.params;
      this.props.attemptGetProducts({
        customerId: id,
        overdue: !overdue,
        sortBy,
        descending,
        offset: DEFAULT_OFFSET_VALUE,
        limit: DEFAULT_LIMIT_VALUE,

      });
      return { overdue: !overdue };
    });
  }

  render() {
    const {
      searchTitle, searchCode, sortBy, descending, overdue,
    } = this.state;
    const { toggleSearch, match } = this.props;
    const customer = this.props.customerProfile.get('customer').toJS();
    const products = this.props.customerProducts.get('products').toJS();
    const showSearch = this.props.app.get('showSearch');
    const loading = this.props.app.get('loading');
    const tableDimensions = {
      title: 300,
      month_value: 120,
      price: 120,
      last_delivered: 120,
      period: 120,
      active: 50,
    };
    const columns = [
      {
        accessor: 'active',
        minWidth: tableDimensions.active,
        style: { padding: '0px', borderBottomLeftRadius: '5px', borderTopLeftRadius: '5px' },
        Cell: row => (
          row.value === true ?
            <button className="btn btn-link btn-overdue-done" onClick={() => this.props.attemptShowHideProduct({ customerProductId: row.original.id, active: false })}>
              <i className="glyphicon glyphicon-ok-sign" />
            </button> :
            <button className="btn btn-link btn-overdue-undo" onClick={() => this.props.attemptShowHideProduct({ customerProductId: row.original.id, active: true })}>
              <i className="glyphicon glyphicon-info-sign" />
            </button>
        ),
      },
      {
        Header: param => <SortableColumn sorted={{ id: sortBy, desc: descending }} param={param} text="Title" />,
        accessor: 'title',
        minWidth: tableDimensions.title,
        Cell: row => (
          <div>
            <div className="row-title">{row.value}</div>
            <div className="row-subtitle">{row.original.code}</div>
          </div>
        ),
      },
      {
        Header: param => <SortableColumn sorted={{ id: sortBy, desc: descending }} param={param} text="Last Delivered" />,
        accessor: 'last_delivered',
        minWidth: tableDimensions.last_delivered,
        Cell: (row) => {
          const duration = moment().diff(moment(row.value), 'days');
          return (
            <span>
              <div className="row-title">{moment(row.value).format('DD MMMM, YYYY')}</div>
              <div className="row-subtitle">({duration} Days)</div>
            </span>
          );
        },
      },
      {
        Header: param => <SortableColumn sorted={{ id: sortBy, desc: descending }} param={param} text="Order Period" />,
        accessor: 'period',
        minWidth: tableDimensions.period,
        Cell: row => (
          <div className="row-single-value">
            <span>{row.value < 365 ? `${row.value} Days` : '-'}</span>
          </div>
        ),
      },
      {
        Header: param => <SortableColumn sorted={{ id: sortBy, desc: descending }} param={param} text="Price" />,
        accessor: 'price',
        minWidth: tableDimensions.price,
        Cell: row => (
          <div className="row-single-value">
            <span>{row.value === null ? 0 : row.value} {customer.currency}</span>
          </div>
        ),
      },
      {
        Header: param => <SortableColumn sorted={{ id: sortBy, desc: descending }} param={param} text="Month Value" />,
        accessor: 'month_value',
        minWidth: tableDimensions.month_value,
        style: { borderRight: 'none' },
        Cell: row => (
          <div className="row-single-value">
            <span>{row.value === null ? 0 : row.value} {customer.currency}</span>
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
      <div className="customer-profile">
        <ButtonNavBar
          showOverDueButton
          toggleOverdue={this.toggleOverdue}
          overdue={overdue}
          id={match.params.id}
        />
        <ReactTable
          data={overdue ? products.filter(item => item.active === true) : products}
          columns={columns}
          className={products.length === 0 && 'table-no-data'}
          onSortedChange={newSorted => this.sort(newSorted[0])}
          manual
          showPagination={false}
          getTableProps={(state, rowInfo, column, instance) => ({
            style: {
              minWidth: `${
                (instance.padding * 2)
                + tableDimensions.title
                + tableDimensions.month_value
                + tableDimensions.price
                + tableDimensions.last_delivered
                + tableDimensions.period
                + tableDimensions.active
              }`,
            },
          })}
          getTrGroupProps={(state, rowInfo) => (
            !rowInfo ? { className: 'hidden' } : { style: this.getBackground(rowInfo.original) }
          )}
        />
        <div className={loading ? 'spinner' : 'hidden'}>
          <BeatLoader color="#529d8f" loading={loading} />
        </div>
        <div className="waypoint">
          <Waypoint
            onEnter={() => this.nextProducts(products)}
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

CustomerProducts.displayName = 'CustomerProducts';

CustomerProducts.propTypes = {
  attemptGetProducts: PropTypes.func,
  match: PropTypes.shape,
  toggleSearch: PropTypes.func,
  attemptShowHideProduct: PropTypes.func,
  customerProfile: PropTypes.shape,
  customerProducts: PropTypes.shape,
  app: PropTypes.shape,
};

const mapStateToProps = state => selector(state, false, ['app', 'customerProfile', 'customerProducts']);

const mapDispatchToProps = dispatch => ({
  attemptGetCustomer: data => dispatch(attemptGetCustomer(data)),
  attemptGetProducts: data => dispatch(attemptGetProducts(data)),
  attemptShowHideProduct: data => dispatch(attemptShowHideProduct(data)),
  purgeUser: () => dispatch(purgeUser()),
  showOverDueAction: flag => dispatch(showOverDueAction(flag)),
  toggleSearch: data => dispatch(toggleSearch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProducts);
