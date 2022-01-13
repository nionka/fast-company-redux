import React from 'react';
import PropTypes from 'prop-types';
import Qualitie from '../../../ui/qualities/Qualitie';
import { useSelector } from 'react-redux';
import { getQualitiesByIds } from '../../../../store/qualities';

const QualitiesCard = ({ qualitiesIds }) => {
  const qualitiesByIds = useSelector(getQualitiesByIds(qualitiesIds));
  return (
    <div className="card mb-3">
    <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
            <span>Qualities</span>
        </h5>
        <p className="card-text">
          {qualitiesByIds.map(quality => <Qualitie key={quality._id} quality={quality} />)}
        </p>
    </div>
</div>
  );
};

QualitiesCard.propTypes = {
  qualitiesIds: PropTypes.array.isRequired
};

export default QualitiesCard;
