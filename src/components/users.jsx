import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import api from '../api';
import Pagination from './Pagination';
import GroupList from './GroupList';
import SearchStatus from './SearchStatus';
import { paginate } from '../utils/paginate';
import UserTable from './UsersTable';
import Loading from './Loading';

const Users = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  const pageSize = 4;

  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll()
      .then(response => setUsers(response));
  }, []);

  const handleDelete = id => {
    setUsers(() => users.filter(user => user._id !== id));
  };

  const handleClick = (id) => {
    setUsers(users.map(user => {
      if (user._id === id) {
        user.status = !user.status;
      }
      return user;
    }));
  };

  useEffect(() => {
    api.professions.fetchAll()
      .then(response => setProfessions(response));
  }, [professions]);

  useEffect(() => {
    setcurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setcurrentPage(pageIndex);
  };

  const clearFilter = () => {
    setSelectedProf();
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(user => user.profession.name === selectedProf.name)
      : users;

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
    <div className="d-flex justify-content-center">
      {professions &&
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button
            className='btn btn-secondary mt-2'
            onClick={clearFilter}
          >
            Очистить
          </button>
        </div>
      }
      <div>
        <SearchStatus length={count} />
        {count !== 0 &&
          <UserTable
            users={usersCrop}
            onSort={handleSort}
            selectedSort={sortBy}
            onDelete={handleDelete}
            handleClick={handleClick}
          />
        }
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
    );
  }
  return <Loading />;
};

export default Users;
