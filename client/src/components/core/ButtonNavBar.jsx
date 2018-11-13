import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ButtonNavBar = (props) => {
  const {
    id,
    overdue,
    showOverDueButton,
    showNewNoteButton,
  } = props;

  return (
    <Grid className="button-navbar">
      <Row>
        <Col className="center-button" xs={3} sm={3}>
          <Link to={`/customer/${id}/products`} className="border-left" activeClassName="active-button-navbar">
            <i className="glyphicon glyphicon-check" />
            <span>Summary</span>
          </Link>
        </Col>
        <Col className="center-button" xs={3} sm={3}>
          <Link to={`/customer/${id}/notes`} activeClassName="active-button-navbar">
            <i className="glyphicon glyphicon-file" />
            <span>Notes</span>
          </Link>
        </Col>
        <Col className="center-button" xs={3} sm={3}>
          <Link to={`/customer/${id}/history`} className="border-right" activeClassName="active-button-navbar">
            <i className="glyphicon glyphicon-time" />
            <span>History</span>
          </Link>
        </Col>
        <Col className="center-button" xs={3} sm={3}>
          {showNewNoteButton && (
            <button onClick={props.showNoteEditor} className="btn btn-link active-button-navbar">
              <i className="glyphicon glyphicon-plus" />
              <span>Add New</span>
            </button>
          )}
          {showOverDueButton && (
            <button onClick={props.toggleOverdue} className={classNames('btn', 'btn-link', { 'active-button-navbar': overdue })}>
              <i className="glyphicon glyphicon-retweet" />
              <span>Over Due</span>
            </button>
          )}
        </Col>
      </Row>
    </Grid>
  );
};

ButtonNavBar.displayName = 'ButtonNavBar';

ButtonNavBar.defaultProps = {
  overdue: true,
  showOverDueButton: false,
  showNewNoteButton: false,
  toggleOverdue: () => null,
  showNoteEditor: () => null,
};

ButtonNavBar.propTypes = {
  id: PropTypes.number.isRequired,
  overdue: PropTypes.bool,
  showOverDueButton: PropTypes.bool,
  showNewNoteButton: PropTypes.bool,
  toggleOverdue: PropTypes.func,
  showNoteEditor: PropTypes.func,
};

export default ButtonNavBar;
