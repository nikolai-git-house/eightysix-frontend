import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import Waypoint from 'react-waypoint';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { BeatLoader } from 'react-spinners';
import { selector } from 'apps/services';
import 'react-table/react-table.css';
import moment from 'moment';
import { attemptGetCustomers } from 'apps/modules/customerIndex/CustomerIndexActions';
import { attemptSignOut } from 'apps/modules/authorisation/AuthActions';
import { DEFAULT_OFFSET_VALUE, DEFAULT_LIMIT_VALUE, USER_ID } from 'configs/constants';
import { Alert, Header, Footer, SearchPanel, NavPanel, SearchForm, SortableColumn } from 'components/common';
import { toggleSearch, toggleNav } from 'apps/modules/app/AppActions';

export class CustomerIndex extends React.Component {
  state = {
    searchTitle: '',
    searchCode: '',
    sortBy: 'threatened_value',
    descending: true,
  };

  componentDidMount() {
    const { sortBy, descending } = this.state;
    this.clearFilter();
    this.props.attemptGetCustomers({
      offset: DEFAULT_OFFSET_VALUE,
      limit: DEFAULT_LIMIT_VALUE,
      sortBy,
      descending,
    });
  }

  onChange(ev) {
    const { value, name } = ev.target;
    this.setState({ [name]: value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const {
      searchTitle, searchCode, sortBy, descending,
    } = this.state;
    this.props.attemptGetCustomers({
      searchTitle,
      searchCode,
      offset: DEFAULT_OFFSET_VALUE,
      limit: DEFAULT_LIMIT_VALUE,
      sortBy,
      descending,
    });
    this.props.toggleSearch();
  }

  getBackground = (row) => {
    const opacity = (row.threatened_value / row.month_value).toFixed(2);
    return { background: `rgba(138, 236, 223, ${opacity})` };
  }

  clearFilter() {
    this.setState({ searchTitle: '', searchCode: '' });
  }

  signOut() {
    const userId = localStorage.getItem(USER_ID);
    this.props.attemptSignOut({ userId });
  }

  nextCustomers(customers) {
    const {
      searchTitle, searchCode, sortBy, descending,
    } = this.state;
    if (customers.length > 0) {
      this.props.attemptGetCustomers({
        searchTitle,
        searchCode,
        offset: customers.length,
        limit: DEFAULT_LIMIT_VALUE,
        sortBy,
        descending,
      });
    }
  }

  sort({ id, desc }) {
    const { searchTitle, searchCode } = this.state;
    this.setState({ sortBy: id, descending: desc });
    this.props.attemptGetCustomers({
      searchTitle,
      searchCode,
      offset: DEFAULT_OFFSET_VALUE,
      limit: DEFAULT_LIMIT_VALUE,
      sortBy: id,
      descending: desc,
    });
  }

  render() {
    const {
      searchTitle, searchCode, sortBy, descending,
    } = this.state;
    const { match, toggleNav, toggleSearch } = this.props;
    const customers = this.props.customerIndex.get('customers').toJS();
    const message = this.props.customerIndex.get('message').toJS();
    const showSearch = this.props.app.get('showSearch');
    const showNav = this.props.app.get('showNav');
    const loading = this.props.app.get('loading');
    const tableDimensions = {
      title: 200,
      threatened_value: 150,
      month_value: 150,
      notes: 450,
    };
    const columns = [
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
        Header: param => <SortableColumn sorted={{ id: sortBy, desc: descending }} param={param} text="Threat Value" />,
        accessor: 'threatened_value',
        minWidth: tableDimensions.threatened_value,
        Cell: row => (
          <div className="row-single-value">
            <span>{row.value === null ? 0 : row.value} {row.original.currency}</span>
          </div>
        ),
      },
      {
        Header: param => <SortableColumn sorted={{ id: sortBy, desc: descending }} param={param} text="Month Value" />,
        accessor: 'month_value',
        minWidth: tableDimensions.month_value,
        Cell: row => (
          <div className="row-single-value">
            <span>{row.value === null ? 0 : row.value} {row.original.currency}</span>
          </div>
        ),
      },
      {
        Header: () => <span>Notes</span>,
        minWidth: tableDimensions.notes,
        style: { borderRight: 'none' },
        Cell: row => (
          <table>
            <tr>
              <td style={{ padding: '0px 10px' }}>
                <span className="row-title">
                  {row.original.lastNoteBy}<br />
                </span>
                <span className="row-subtitle">
                  {row.original.lastNoteTimestamp && moment(row.original.lastNoteTimestamp).format('DD MMMM, YYYY')}
                </span>
              </td>
              <td style={{ padding: '0px 10px' }}>
                {row.original.lastNote}
              </td>
            </tr>
          </table>
        ),
      },
    ];

    const searchFields = {
      fields: [{
        id: 1,
        label: 'Customer Name',
        name: 'searchTitle',
        placeholder: 'Name',
        value: searchTitle,
      },
      {
        id: 2,
        label: 'Customer Code',
        name: 'searchCode',
        placeholder: 'Code',
        value: searchCode,
      }],
    };

    return (
      <div className="customer">
        <Header
          match={match}
          toggleSearch={toggleSearch}
          toggleNav={toggleNav}
        />
        <Alert
          show={message.type === 'danger'}
          message={message.message}
        >
          <ReactTable
            data={customers}
            columns={columns}
            className={customers.length === 0 && 'table-no-data'}
            pageSize={customers.length}
            onSortedChange={newSorted => this.sort(newSorted[0])}
            getTableProps={
              (state, rowInfo, column, instance) => ({
                style: {
                    minWidth: `${
                    (instance.padding * 2)
                    + tableDimensions.title
                    + tableDimensions.threatened_value
                    + tableDimensions.month_value
                    + tableDimensions.notes
                  }`,
                },
              })
            }
            getTrGroupProps={(state, rowInfo) => ({ style: this.getBackground(rowInfo.original) })}
            getTrProps={(state, rowInfo) => ({
              onClick: () => this.props.history.push(`/customer/${rowInfo.original.id}/products`),
              style: { cursor: 'pointer' },
            })}
            manual
            showPagination={false}
          />
          <div className={loading ? 'spinner' : 'hidden'}>
            <BeatLoader color="#529d8f" loading={loading} />
          </div>
          <div className="waypoint">
            <Waypoint
              onEnter={() => this.nextCustomers(customers)}
              threshold={0}
            />
          </div>
          <NavPanel
            isVisible={showNav}
            onVisibleChange={toggleNav}
            signOut={this.signOut}
            toggleNav={toggleNav}
          />
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
        </Alert>
        <Footer />
      </div>
    );
  }
}

CustomerIndex.displayName = 'CustomerIndex';

CustomerIndex.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  app: PropTypes.instanceOf(Map).isRequired,
  customerIndex: PropTypes.instanceOf(Map).isRequired,
  attemptGetCustomers: PropTypes.func.isRequired,
  attemptSignOut: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => selector(state, false, ['app', 'authorisation', 'customerIndex']);

const mapDispatchToProps = dispatch => ({
  attemptGetCustomers: data => dispatch(attemptGetCustomers(data)),
  attemptSignOut: data => dispatch(attemptSignOut(data)),
  toggleSearch: () => dispatch(toggleSearch()),
  toggleNav: () => dispatch(toggleNav()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerIndex);
