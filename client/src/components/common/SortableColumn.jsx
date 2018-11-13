import React from 'react';
import PropTypes from 'prop-types';

const SortableColumn = (props) => {
  const { text, sorted, param } = props;

  return (
    <span>{text} &nbsp;
      {
        sorted.id !== param.column.id &&
        <i className="glyphicon glyphicon-chevron-down white-chevron" />
      }
      {
        sorted.id === param.column.id && sorted.desc &&
        <i className="glyphicon glyphicon-chevron-down green-chevron" />
      }
      {
        sorted.id === param.column.id && !sorted.desc &&
        <i className="glyphicon glyphicon-chevron-up green-chevron" />
      }
    </span>
  );
};

SortableColumn.displayName = 'SortableColumn';

SortableColumn.defaultProps = {
  sorted: {
    id: 'title',
    desc: true,
  },
  param: {
    column: {
      id: null,
    },
  },
};

SortableColumn.propTypes = {
  text: PropTypes.string.isRequired,
  sorted: PropTypes.shape({
    id: PropTypes.string.isRequired,
    desc: PropTypes.bool.isRequired,
  }),
  param: PropTypes.shape({
    column: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

export default SortableColumn;
