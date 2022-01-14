import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getProfessionById } from '../../store/professions';

const Profession = ({ id }) => {
  const profession = useSelector(getProfessionById(id));

  if (profession) {
    return (<p>{profession.name}</p>);
  }
  return (<p>loading...</p>);
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
