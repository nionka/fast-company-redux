import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination m-2">
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
          >
            Previous
          </a>
        </li>
        {pages.map(page => (
            <li className={`page-item ${page === currentPage ? 'active' : ''}`} key={page}>
              <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
            </li>
        ))}
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => onPageChange(currentPage === pages.length ? currentPage : currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
