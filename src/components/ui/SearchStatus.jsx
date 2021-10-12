import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({ length }) => {
  let status = '';

  if (!length) {
    status = 'Никто с тобой не тусанет';
  } else {
    const variable = [2, 3, 4];
    const last = String(length).split('');
    let option = '';

    if (!variable.includes(Number(last[last.length - 1]))) {
      option = 'человек тусанет';
    } else {
      if (+last[0] === 1 && last.length === 2) {
        option = 'человек тусанет';
      } else {
        option = 'человека тусанут';
      }
    }

    status = `${length} ${option} с тобой сегодня`;
  }

  return (
    <span
      className={`badge fs-4 m-1 bg-${length === 0 ? 'danger' : 'primary'}`}
    >
      {status}
    </span>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};

export default SearchStatus;
