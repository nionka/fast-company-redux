import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useComments } from '../../../../hooks/useComments';
import { getComments, getCommentsLoadingStatus, loadCommentsList } from '../../../../store/comments';
import Loading from '../../Loading';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

const CommentsList = () => {
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { createComment, removeComment } = useComments();

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

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
      { !isLoading
        ? (
        <div className="card mb-3">
          <div className="card-body ">
              <h2>Comments</h2>
              <hr />
              {comments
                // .sort((a, b) => Number(b.created_at) - Number(a.created_at))
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
          )
        : <Loading />
      }
    </>
  );
};

export default CommentsList;
