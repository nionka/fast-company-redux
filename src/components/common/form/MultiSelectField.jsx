import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const MultiSelectField = ({ options, onChange, name, label }) => {
  const optionsArray = !Array.isArray(options) && typeof options === 'object'
    ? Object.keys(options).map(opt => ({ label: options[opt].name, value: options[opt]._id }))
    : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        name={name}
        onChange={handleChange}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  error: PropTypes.string
};

export default MultiSelectField;
