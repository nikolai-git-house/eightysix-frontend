import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { BeatLoader } from 'react-spinners';
import { selector } from 'apps/services';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { DEFAULT_OFFSET_VALUE, DEFAULT_LIMIT_VALUE } from 'configs/constants';
import { ButtonNavBar } from 'components/core';
import { attemptGetNotes, attemptUpdateNote, attemptCreateNote, attemptDeleteNote } from 'apps/modules/customerNotes/CustomerNotesActions';
import { purgeUser } from 'apps/modules/authorisation/AuthActions';
import { toggleSearch } from 'apps/modules/app/AppActions';
import ReactTable from 'react-table';
import { Footer, SearchPanel, SearchForm } from 'components/common';

class CustomerNotes extends Component {
  state = {
    searchUser: '',
    showNoteEditor: false,
    newNote: {
      note: '',
    },
    editNote: {
      note: '',
    },
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.attemptGetNotes({
      customerId: id,
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
    const { id } = this.props.match.params;
    const { searchUser, sortBy, descending } = this.state;
    this.props.attemptGetNotes({
      customerId: id,
      searchUser,
      offset: DEFAULT_OFFSET_VALUE,
      limit: DEFAULT_LIMIT_VALUE,
      sortBy,
      descending,
    });
    this.props.toggleSearch();
  }

  onNoteClick(row) {
    this.setState({
      editNote: row,
      showNoteEditor: true,
    });
  }

  resetState() {
    this.setState({
      showNoteEditor: false,
      editNote: {
        note: '',
      },
    });
  }

  createNewNote = () => {
    this.setState({ showNoteEditor: true });
  }

  saveNote() {
    const { newNote, editNote } = this.state;
    if (editNote.id) {
      if (newNote) {
        editNote.note = newNote.note;
      }
      this.props.attemptUpdateNote({ id: editNote.id, note: editNote.note });
    } else {
      const { id } = this.props.match.params;
      this.props.attemptCreateNote({ customerId: id, note: newNote.note });
    }
    this.resetState();
  }

  removeNote() {
    const { editNote } = this.state;
    if (editNote.id) {
      this.props.attemptDeleteNote(editNote);
    }
    this.resetState();
  }

  handleCloseNoteModal() {
    this.resetState();
  }

  clearFilter() {
    this.setState({ searchUser: '' });
  }

  nextNotes(notes) {
    const { searchUser, match: { params: { id } } } = this.props;
    if (notes.length > 0) {
      this.props.attemptGetNotes({
        customerId: id,
        searchUser,
        offset: notes.length,
        limit: DEFAULT_LIMIT_VALUE,
      });
    }
  }

  render() {
    const { searchUser } = this.state;
    const { match, toggleSearch } = this.props;
    const notes = this.props.customerNotes.get('notes').toJS();
    const showSearch = this.props.app.get('showSearch');
    const loading = this.props.app.get('loading');
    const tableDimensions = {
      timestamp: 200,
      user: 200,
      note: 450,
    };
    const columns = [
      {
        Header: () => <span>Date</span>,
        accessor: 'timestamp',
        minWidth: tableDimensions.timestamp,
        Cell: row => (
          <div className="row-single-value">
            <span>{moment(row.value).format('DD MMMM, YYYY')}</span>
          </div>
        ),
      },
      {
        Header: () => <span>User</span>,
        accessor: 'user',
        minWidth: tableDimensions.user,
        Cell: row => (
          <div className="row-single-value">
            <span>{row.original.user.name || 'Empty'}</span>
          </div>
        ),
      },
      {
        Header: () => <span>Notes</span>,
        accessor: 'note',
        minWidth: tableDimensions.note,
        style: { borderRight: 'none', whiteSpace: 'pre' },
      },
    ];

    const searchFields = {
      fields: [{
        id: 1,
        label: 'User',
        name: 'searchUser',
        placeholder: 'Name',
        value: searchUser,
      }],
    };

    return (
      <div className="notes">
        <ButtonNavBar
          showNoteEditor={this.createNewNote}
          showNewNoteButton
          id={match.params.id}
        />
        <ReactTable
          data={notes}
          columns={columns}
          className={notes.length === 0 && 'table-no-data'}
          onSortedChange={newSorted => this.sort(newSorted[0])}
          manual
          showPagination={false}
          getTableProps={(state, rowInfo, column, instance) => ({
            style: {
              minWidth: `${
                (instance.padding * 2)
                + tableDimensions.timestamp
                + tableDimensions.user
                + tableDimensions.note
              }`,
            },
          })}
          getTrGroupProps={(state, rowInfo) => (
            !rowInfo
              ? { className: 'hidden' }
              : {
                style: { cursor: 'pointer' },
                onClick: () => this.onNoteClick(rowInfo.original),
              }
          )}
        />
        <div className={loading ? 'spinner' : 'hidden'}>
          <BeatLoader color="#529d8f" loading={loading} />
        </div>
        <div className="waypoint">
          <Waypoint
            onEnter={() => this.nextNotes(notes)}
            threshold={0}
          />
        </div>
        <Modal bsSize="sm" show={this.state.showNoteEditor} onHide={() => this.handleCloseNoteModal()}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.editNote.id ? 'Edit Note' : 'Create New Note'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              onKeyUp={(e) => { this.setState({ newNote: { note: e.target.value } }); }}
              placeholder="Type here"
              className="notes-textarea"
              defaultValue={this.state.editNote.note}
              col="40"
              row="40"
            />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => this.saveNote()} className="btn btn-link btn-modal-success">
              Submit
            </button>
            {this.state.editNote.id && (
            <button onClick={() => this.removeNote()} className="btn btn-link btn-modal-danger">
              Remove Note
            </button>
            )}
          </Modal.Footer>
        </Modal>
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

CustomerNotes.displayName = 'CustomerNotes';

CustomerNotes.propTypes = {
  match: PropTypes.shape,
  attemptGetNotes: PropTypes.func,
  toggleSearch: PropTypes.func,
  attemptUpdateNote: PropTypes.func,
  attemptCreateNote: PropTypes.func,
  attemptDeleteNote: PropTypes.func,
  customerNotes: PropTypes.shape,
  searchUser: PropTypes.string,
  app: PropTypes.shape,
};

const mapStateToProps = state => selector(state, false, ['app', 'customerProfile', 'customerNotes']);

const mapDispatchToProps = dispatch => ({
  attemptGetNotes: data => dispatch(attemptGetNotes(data)),
  attemptUpdateNote: data => dispatch(attemptUpdateNote(data)),
  attemptCreateNote: data => dispatch(attemptCreateNote(data)),
  attemptDeleteNote: data => dispatch(attemptDeleteNote(data)),
  purgeUser: () => dispatch(purgeUser()),
  toggleSearch: data => dispatch(toggleSearch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerNotes);
