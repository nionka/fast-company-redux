import React from 'react';
import PropTypes from 'prop-types';
import Qualitie from './Qualitie';

const QualitiesList = ({ qualitiesId }) => {
  return (
      <>
        {qualitiesId.map(badge => <Qualitie key={badge} qualityId={badge} />)}
      </>
  );
};

QualitiesList.propTypes = {
  qualitiesId: PropTypes.array
};

export default QualitiesList;
