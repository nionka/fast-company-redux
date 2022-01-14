import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Pagination from '../../common/Pagination';
import GroupList from '../../common/GroupList';
import SearchStatus from '../../ui/SearchStatus';
import { paginate } from '../../../utils/paginate';
import UserTable from '../../ui/UsersTable';
import Loading from '../../common/Loading';
import TextField from '../../common/form/TextField';
import { useUser } from '../../../hooks/useUsers';
import { useAuth } from '../../../hooks/useAuth';
import { getProfessions, getProfessionsLoadingStatus } from '../../../store/professions';
import { useSelector } from 'react-redux';

const UsersListPage = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [search, setSearch] = useState('');

  const pageSize = 4;

  const { users } = useUser();
  const { currentUser } = useAuth();
  console.log(users);

  const handleClick = (id) => {
    console.log('click');
  };

  useEffect(() => {
    setcurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearch('');
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

  const handleSearch = (target) => {
    setSearch(target.value);
    setSelectedProf();
  };

  if (users) {
    let filteredUsers = users.filter((u) => u._id !== currentUser._id);

    if (selectedProf) {
      filteredUsers = users.filter(user => user.profession === selectedProf._id);
    }

    if (search) {
      filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
    }

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
    <div className="d-flex justify-content-center">
      {professions && !professionsLoading &&
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
        <TextField
          label=""
          name="search"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
        {count !== 0 &&
          <UserTable
            users={usersCrop}
            onSort={handleSort}
            selectedSort={sortBy}
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

export default UsersListPage;
