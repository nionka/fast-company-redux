import React from 'react';
import { useComments } from '../../../../hooks/useComments';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

const CommentsList = () => {
  const { createComment, comments, removeComment } = useComments();

  const handleSubmit = (data) => {
    createComment(data);
  };

  const handleDeleteComment = (commentId) => {
    removeComment(commentId);
  };

  return (
    <>
      <div className="card mb-2">
          <div className="card-body ">
              <CommentForm onSubmit={handleSubmit} />
          </div>
      </div>
      { comments.length !== 0 &&
        <div className="card mb-3">
          <div className="card-body ">
              <h2>Comments</h2>
              <hr />
              {comments
                .sort((a, b) => Number(b.created_at) - Number(a.created_at))
                .map(comment => (
                <CommentCard
                  key={comment._id}
                  commentId={comment._id}
                  userId={comment.userId}
                  content={comment.content}
                  handleDeleteComment={handleDeleteComment}
                  date={comment.created_at}
                />))
              }
          </div>
        </div>
      }
    </>
  );
};

export default CommentsList;
