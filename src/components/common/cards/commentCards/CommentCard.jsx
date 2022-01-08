import React from 'react';
import PropTypes from 'prop-types';
import { calculateDate } from '../../../../utils/calculateDate';
import { useUser } from '../../../../hooks/useUsers';
import { useAuth } from '../../../../hooks/useAuth';

const CommentCard = ({ userId, content, date, commentId, handleDeleteComment }) => {
  const { getUserById } = useUser();
  const { currentUser } = useAuth();
  const user = getUserById(userId);

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
                src={user.image}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                      {user && user.name }
                      <span className="small">
                          - {calculateDate(date)}
                      </span>
                  </p>
                  {currentUser._id === userId && (
                     <button className="btn btn-sm text-primary d-flex align-items-center" onClick={() => handleDeleteComment(commentId)}>
                        <i className="bi bi-x-lg"></i>
                      </button>
                  )}
                </div>
                <p className="small mb-0">
                  {content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};

CommentCard.propTypes = {
  userId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  commentId: PropTypes.string.isRequired,
  handleDeleteComment: PropTypes.func.isRequired
};

export default CommentCard;
