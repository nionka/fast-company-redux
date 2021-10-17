import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';
import api from '../../../api';
import QualitiesList from '../../ui/qualities';
import { useHistory } from 'react-router-dom';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    api.users.getById(userId)
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
        <button
          className="btn btn-primary"
          onClick={() => history.push(`/users/${userId}/edit`)}
        >
          Изменить
        </button>
      </div>
    );
  }

  return <Loading />;
};

UserPage.propTypes = {
  userId: PropTypes.string
};

export default UserPage;
