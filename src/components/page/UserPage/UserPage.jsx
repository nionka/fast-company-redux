import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';
import api from '../../../api';
import InfoCard from '../../common/cards/userCards/InfoCard';
import { useHistory } from 'react-router-dom';
import QualitiesCard from '../../common/cards/userCards/QualitiesCard';
import MeetingsCard from '../../common/cards/userCards/MeetingsCard';
import CommentsList from '../../common/cards/commentCards/CommenstList';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    api.users.getById(userId)
      .then(response => setUser(response));
  }, []);

  const handleEdit = () => {
    history.push(`/users/${userId}/edit`);
  };

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <InfoCard
            name={user.name}
            profession={user.profession.name}
            rate={user.rate}
            handleEdit={handleEdit}
          />
          <QualitiesCard qualities={user.qualities}/>
          <MeetingsCard meetingsNumber={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <CommentsList />
        </div>
        </div>
      </div>
    );
  }

  return <Loading />;
};

UserPage.propTypes = {
  userId: PropTypes.string
};

export default UserPage;
