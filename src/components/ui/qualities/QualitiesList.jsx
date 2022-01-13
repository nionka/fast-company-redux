import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Qualitie from './Qualitie';
import { useSelector, useDispatch } from 'react-redux';
import { getQualitiesByIds, loadQualitiesList } from '../../../store/qualities';

const QualitiesList = ({ qualitiesId }) => {
  const dispatch = useDispatch();
  const qualitiesByIds = useSelector(getQualitiesByIds(qualitiesId));

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);
  return (
      <>
        {qualitiesByIds.map((quality) => <Qualitie key={quality._id} quality={quality} />)}
      </>
  );
};

QualitiesList.propTypes = {
  qualitiesId: PropTypes.array
};

export default QualitiesList;
