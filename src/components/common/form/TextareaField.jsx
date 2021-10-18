import React from 'react';
import PropTypes from 'prop-types';

const TextareaField = ({ label, placeholder, name, rows, onChange, value, error }) => {
  const getInputClasses = () => {
    return `form-control ${error ? 'is-invalid' : ''}`;
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          className={getInputClasses()}
          placeholder={placeholder}
          id={name}
          name={name}
          value={value}
          rows={rows}
          onChange={handleChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
  </div>
  );
};

TextareaField.defaultProps = {
  placeholder: '',
  rows: 3
};

TextareaField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string
};

export default TextareaField;
