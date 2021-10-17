import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const transformOptions = (options) => {
    return !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map(opt => ({ label: options[opt].name, value: options[opt]._id }))
      : options.map(opt => ({ label: opt.name, value: opt._id }));
  };

  const optionsArray = transformOptions(options);
  const defaultOptions = transformOptions(defaultValue);

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
        defaultValue={defaultOptions}
        onChange={handleChange}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};

MultiSelectField.defaultProps = {
  defaultValue: []
};

MultiSelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  error: PropTypes.string,
  defaultValue: PropTypes.array
};

export default MultiSelectField;
