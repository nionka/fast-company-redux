import React from 'react';
import { useParams } from 'react-router';
import UserPage from '../components/page/UserPage';
import UsersListPage from '../components/page/UsersListPage';
import EditForm from '../components/ui/EditForm';

const Users = () => {
  const params = useParams();
  const { userId } = params;
  const { edit } = params;

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
    <>
      {getCurrentElem()}
    </>
  );
};

export default Users;
