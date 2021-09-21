import React from 'react';
import PropTypes from 'prop-types';
import BookMark from './BookMark';
import Qualitie from './Qualitie';

const User = ({ user, onDelete, ...rest }) => {
  const { name, profession, completedMeetings, rate, qualities, status } = user;

  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map(badge => <Qualitie key={badge._id} {...badge} />)}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{`${rate}/5`}</td>
      <td>
        <BookMark status={status} id={user._id} {...rest} />
      </td>
      <td>
        <button
          onClick={() => onDelete(user._id)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default User;
