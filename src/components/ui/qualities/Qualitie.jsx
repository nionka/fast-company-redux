import React from 'react';
import PropTypes from 'prop-types';

const Qualitie = ({ quality }) => {
  const style = `badge bg-${quality.color} me-1`;

  return (
    <span className={style}>{quality.name}</span>
  );
};

Qualitie.propTypes = {
  quality: PropTypes.object
};

export default Qualitie;
