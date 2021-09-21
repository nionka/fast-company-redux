import React from 'react';
import PropTypes from 'prop-types';
import Qualitie from './Qualitie';

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map(badge => <Qualitie key={badge._id} {...badge} />)}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
