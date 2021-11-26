import React from 'react';
import PropTypes from 'prop-types';
import Qualitie from './Qualitie';

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((badge, index) => <Qualitie key={badge._id || index} {...badge} />)}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
