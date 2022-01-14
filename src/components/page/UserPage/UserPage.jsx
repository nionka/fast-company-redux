import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';
import InfoCard from '../../common/cards/userCards/InfoCard';
import { useHistory } from 'react-router-dom';
import QualitiesCard from '../../common/cards/userCards/QualitiesCard';
import MeetingsCard from '../../common/cards/userCards/MeetingsCard';
import CommentsList from '../../common/cards/commentCards/CommenstList';
import CommentsProvider from '../../../hooks/useComments';
import { useSelector } from 'react-redux';
import { getProfessionById } from '../../../store/professions';
import { getUserById } from '../../../store/users';

const UserPage = ({ userId }) => {
  const history = useHistory();
  const user = useSelector(getUserById(userId));
  const profession = useSelector(getProfessionById(user.profession));

  const handleEdit = () => {
    history.push(`/users/${userId}/edit`);
  };

  if (user && profession) {
    return (
      <div className="container">
        <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <InfoCard
            id={user._id}
            name={user.name}
            profession={profession.name}
            rate={user.rate}
            image={user.image}
            handleEdit={handleEdit}
          />
          <QualitiesCard qualitiesIds={user.qualities}/>
          <MeetingsCard meetingsNumber={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <CommentsProvider>
            <CommentsList />
          </CommentsProvider>
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
