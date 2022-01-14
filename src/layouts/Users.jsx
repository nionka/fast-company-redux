import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import UsersLoader from '../components/hoc/UsersLoader';
import UserPage from '../components/page/UserPage';
import UsersListPage from '../components/page/UsersListPage';
import EditForm from '../components/ui/EditForm';
import { getCurrentUserId } from '../store/users';

const Users = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const params = useParams();
  const { userId, edit } = params;
  console.log(currentUserId);

  const getCurrentElem = () => {
    let currentEl = <UsersListPage />;

    if (userId && edit) {
      currentEl = <EditForm />;
    }

    if (userId && !edit) {
      currentEl = <UserPage userId={userId} />;
    }

    return currentEl;
  };

  return (
    <UsersLoader>
      {getCurrentElem()}
    </UsersLoader>
  );
};

export default Users;
