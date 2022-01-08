import React from 'react';
import PropTypes from 'prop-types';
import Qualitie from '../../../ui/qualities/Qualitie';

const QualitiesCard = ({ qualities }) => {
  return (
    <div className="card mb-3">
    <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
            <span>Qualities</span>
        </h5>
        <p className="card-text">
          {qualities.map(quality => <Qualitie key={quality} qualityId={quality} />)}
        </p>
    </div>
</div>
  );
};

QualitiesCard.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesCard;
