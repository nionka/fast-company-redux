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
          {qualities.map(qualitie => <Qualitie key={qualitie._id} color={qualitie.color} name={qualitie.name} />)}
        </p>
    </div>
</div>
  );
};

QualitiesCard.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesCard;
