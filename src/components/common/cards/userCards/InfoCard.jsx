import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../../../../store/users';

const InfoCard = ({ id, name, profession, rate, handleEdit, image }) => {
  const currentUserId = useSelector(getCurrentUserId());
  return (
    <div className="card mb-3">
    <div className="card-body">
        {currentUserId === id && (
            <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={handleEdit}>
                <i className="bi bi-gear"></i>
            </button>
        )}
        <div className="d-flex flex-column align-items-center text-center position-relative">
            <img
                src={image}
                className="rounded-circle"
                width="150"
            />
            <div className="mt-3">
                <h4>{name}</h4>
                <p className="text-secondary mb-1">{profession}</p>
                <div className="text-muted">
                    <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                    <i className="bi bi-caret-up text-secondary" role="button"></i>
                    <span className="ms-2">{rate}</span>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

InfoCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  image: PropTypes.string,
  handleEdit: PropTypes.func.isRequired
};

export default InfoCard;
