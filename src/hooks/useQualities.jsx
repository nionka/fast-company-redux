import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import qualityService from '../services/quality.service';

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQualitiesList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getQualitiesList () {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  }

  function getQuality (qualitiesId) {
    const qualitiesArray = [];

    qualities.forEach(q => {
      if (qualitiesId.includes(q._id)) {
        qualitiesArray.push(q);
      }
    });

    return qualitiesArray;
  }

  function errorCather (error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  return (
    <QualitiesContext.Provider value={{ isLoading, getQuality, qualities }}>
      {children}
    </QualitiesContext.Provider>
  );
};

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
