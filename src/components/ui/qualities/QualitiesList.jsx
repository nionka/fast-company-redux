import React from 'react';
import PropTypes from 'prop-types';
import Qualitie from './Qualitie';
import { useQualities } from '../../../hooks/useQualities';

const QualitiesList = ({ qualitiesId }) => {
  const { isLoading, getQuality } = useQualities();
  const quality = getQuality(qualitiesId);

  if (!isLoading) {
    return (
      <>
        {quality.map(badge => <Qualitie key={badge._id} {...badge} />)}
      </>
    );
  }
  return (<p>loading...</p>);
};

QualitiesList.propTypes = {
  qualitiesId: PropTypes.array
};

export default QualitiesList;
