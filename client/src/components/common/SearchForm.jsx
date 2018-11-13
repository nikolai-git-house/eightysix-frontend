import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = (props) => {
  const { onChange, onSubmit, search } = props;

  return (
    <div style={{ width: '95%', margin: '0 auto', padding: '1px 0px' }}>
      <i className="glyphicon glyphicon-remove search-panel-remove-btn" onClick={props.togglePanel} />
      <i className="glyphicon glyphicon-pencil search-panel-clear-btn" onClick={props.clearFilter} />
      <form onSubmit={ev => onSubmit(ev)} method="post" className="search-panel-form">
        {search.fields.map((field, i) => (
          <div className="form-content-element" key={i}>
            <label htmlFor={field.id}>{field.label}
              <input
                className="form-input-text-element search-form-text-box"
                id={field.id}
                name={field.name}
                onChange={ev => onChange(ev)}
                placeholder={field.placeholder}
                type="text"
                value={field.value}
              />
            </label>
          </div>
        ))}
        <div className="form-content-element">
          <button className="search-form-buttonSuccess search-form-button" type="submit">
            <span className="form-button-content"><span>Submit</span></span>
          </button>
        </div>
      </form>
    </div>
  );
};

SearchForm.displayName = 'SearchForm';

SearchForm.defaultProps = {
  search: {
    fields: {
      id: 0,
      label: '',
      name: '',
      placeholder: '',
      value: '',
    },
  },
};

SearchForm.propTypes = {
  togglePanel: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  search: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })),
  }),
};

export default SearchForm;
