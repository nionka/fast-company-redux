import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import BookMark from './BookMark';
import QualitiesList from './QualitiesList';
import Table from './Table';

const UserTable = ({ users, onSort, selectedSort, onDelete, ...rest }) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: { name: 'Качества', component: (user) => (<QualitiesList qualities={user.qualities} />) },
    profession: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    status: { path: 'status', name: 'Избранное', component: (user) => <BookMark status={user.status} id={user._id} {...rest} /> },
    delete: {
      component: (user) => (
      <button
          onClick={() => onDelete(user._id)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      )
    }
  };

  return (
    <>
      <Table
        onSort={onSort}
        selectedSort={selectedSort}
        columns={columns}
        data={users}
      >
        <TableHeader { ...{ onSort, selectedSort, columns }} />
        <TableBody {...{ columns, data: users }} />
      </Table>
    </>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object,
  onDelete: PropTypes.func
};

export default UserTable;
