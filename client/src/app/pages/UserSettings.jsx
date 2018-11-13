import React from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import { BeatLoader } from 'react-spinners';
import { selector } from 'apps/services';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import {
  Alert,
  Header,
  Footer,
  SearchPanel,
  NavPanel,
  SearchForm,
  SortableColumn,
} from 'components/common';

import {
  DEFAULT_OFFSET_VALUE,
  DEFAULT_LIMIT_VALUE,
  USER_ID,
} from 'configs/constants';

import {
  attemptGetAllCustomers,
  attemptFollowCustomer,
  attemptUnfollowCustomer,
} from 'apps/modules/userSettings/UserSettingsActions';

import { attemptSignOut } from 'apps/modules/authorisation/AuthActions';

import {
  toggleSearch,
  toggleNav,
} from 'apps/modules/app/AppActions';

class UserSettings extends React.Component {
  state = {
    searchTitle: '',
    searchCode: '',
    sortBy: 'title',
    descending: false,
  };

  componentDidMount() {
    const { sortBy, descending } = this.state;
    this.props.attemptGetAllCustomers({
      offset: DEFAULT_OFFSET_VALUE,
      limit: DEFAULT_LIMIT_VALUE,
      sortBy,
      descending,
    });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const {
      searchTitle, searchCode, sortBy, descending,
    } = this.state;
    this.props.attemptGetAllCustomers({
      offset: DEFAULT_OFFSET_VALUE,
      limit: DEFAULT_LIMIT_VALUE,
      sortBy,
      descending,
      searchTitle,
      searchCode,
    });
    this.props.toggleSearch();
  }

  onChange(ev) {
    const { value, name } = ev.target;
    this.setState({ [name]: value });
  }

  onToggleCheck = (e, row, userId) => {
    if (e.target.checked) {
      this.props.attemptFollowCustomer({ id: row.original.id, user_id: userId });
    } else {
      this.props.attemptUnfollowCustomer({ id: row.original.id, user_id: userId });
    }
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
      this.props.attemptGetAllCustomers({
        offset: customers.length,
        limit: DEFAULT_LIMIT_VALUE,
        sortBy,
        descending,
        searchTitle,
        searchCode,
      });
    }
  }

  sort({ id, desc }) {
    const { searchTitle, searchCode } = this.state;
    this.props.attemptGetAllCustomers({
      offset: DEFAULT_OFFSET_VALUE,
      limit: DEFAULT_LIMIT_VALUE,
      sortBy: id,
      descending: desc,
      searchTitle,
      searchCode,
    });
  }

  render() {
    const {
      searchTitle, searchCode, sortBy, descending,
    } = this.state;
    const { match, toggleNav, toggleSearch } = this.props;
    const customers = this.props.userSettings.get('customers').toJS();
    const message = this.props.userSettings.get('message').toJS();
    const showSearch = this.props.app.get('showSearch');
    const showNav = this.props.app.get('showNav');
    const loading = this.props.app.get('loading');
    const userId = localStorage.getItem(USER_ID);
    const tableDimensions = {
      title: 200,
      u_id: 150,
    };
    const columns = [
      {
        Header: param => <SortableColumn sorted={{ id: sortBy, desc: descending }} param={param} text="Title" />,
        accessor: 'title',
        minWidth: tableDimensions.title,
        Cell: row => (
          <div>
            <div className="row-title">{ row.value }</div>
            <div className="row-subtitle">{ row.original.code }</div>
          </div>
        ),
      },
      {
        Header: param => <SortableColumn sorted={{ id: sortBy, desc: descending }} param={param} text="Following" />,
        accessor: 'u_id',
        minWidth: tableDimensions.u_id,
        style: { borderRight: 'none' },
        Cell: row => (
          <div className="selector">
            <label className="switch">
              <input
                id={`toggle_${row.original.id}`}
                name={`toggle_${row.original.id}`}
                type="checkbox"
                checked={row.original.u_id === parseInt(userId, 10)}
                onClick={e => this.onToggleCheck(e, row, userId)}
              />
              <span className="slider" />
            </label>
          </div>
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
      <div>
        <Header
          match={match}
          toggleSearch={() => toggleSearch()}
          toggleNav={() => toggleNav()}
        />
        { message && <Alert message={message} /> }
        <ReactTable
          data={customers}
          columns={columns}
          className={customers.length === 0 && 'table-no-data'}
          pageSize={customers.length}
          onSortedChange={newSorted => this.sort(newSorted[0])}
          manual
          showPagination={false}
          getTableProps={(state, rowInfo, column, instance) => ({
            style: {
              minWidth: `${
                (instance.padding * 2)
                + tableDimensions.title
                + tableDimensions.u_id
              }`,
            },
          })}
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
        <Footer />
      </div>
    );
  }
}

UserSettings.displayName = 'UserSettings';

UserSettings.propTypes = {
  attemptGetAllCustomers: PropTypes.func,
  toggleSearch: PropTypes.func,
  attemptSignOut: PropTypes.func,
  userSettings: PropTypes.shape,
  app: PropTypes.shape,
  attemptFollowCustomer: PropTypes.shape,
  attemptUnfollowCustomer: PropTypes.shape,
  match: PropTypes.shape,
  toggleNav: PropTypes.func,
};

const mapStateToProps = state => selector(state, false, ['app', 'authorisation', 'userSettings']);

const mapDispatchToProps = dispatch => ({
  attemptGetAllCustomers: data => dispatch(attemptGetAllCustomers(data)),
  attemptSignOut: data => dispatch(attemptSignOut(data)),
  attemptFollowCustomer: data => dispatch(attemptFollowCustomer(data)),
  attemptUnfollowCustomer: data => dispatch(attemptUnfollowCustomer(data)),
  toggleSearch: () => dispatch(toggleSearch()),
  toggleNav: () => dispatch(toggleNav()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
