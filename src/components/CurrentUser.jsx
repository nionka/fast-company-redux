import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import api from '../api';
import QualitiesList from './QualitiesList';
import { useHistory } from 'react-router-dom';

const CurrentUser = ({ match }) => {
  const [user, setUser] = useState();
  const history = useHistory();
  const id = match.params.id;

  useEffect(() => {
    api.users.getById(id)
      .then(response => setUser(response));
  }, []);

  if (user) {
    return (
      <div className="m-3">
        <h1>{user.name}</h1>
        <h3>Профессия: {user.profession.name}</h3>
        <div className="mb-2">
          <QualitiesList qualities={user.qualities}/>
        </div>
        <div>completedMeetings: {user.completedMeetings}</div>
        <h3>Rate: {user.rate}</h3>
        <button onClick={() => history.push('/users')}>Все пользователи</button>
      </div>
    );
  }

  return <Loading />;
};

CurrentUser.propTypes = {
  match: PropTypes.object
};

export default CurrentUser;
