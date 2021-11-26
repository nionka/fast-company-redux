import React from 'react';
import PropTypes from 'prop-types';

const Qualitie = ({ color, name }) => {
  const style = `badge bg-${color} me-1`;

  return (
    <span className={style}>{name}</span>
  );
};

Qualitie.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string
};

export default Qualitie;
