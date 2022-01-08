import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../../hooks/useQualities';

const Qualitie = ({ qualityId }) => {
  const { getQuality } = useQualities();
  const quality = getQuality(qualityId);
  const style = `badge bg-${quality.color} me-1`;

  return (
    <span className={style}>{quality.name}</span>
  );
};

Qualitie.propTypes = {
  qualityId: PropTypes.string
};

export default Qualitie;
