import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from '../../../../api';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState();
  const [renderComment, setRenderComment] = useState(false);
  const params = useParams();
  const { userId } = params;

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId)
      .then(response => setComments(response));
  }, [renderComment]);

  useEffect(() => {
    api.users.fetchAll()
      .then(response => setUsers(response));
  }, []);

  const handleSubmit = (data) => {
    api.comments.add({ pageId: userId, userId: data.name, content: data.content });
    setRenderComment(!renderComment);
  };

  const handleDeleteComment = (commentId) => {
    api.comments.remove(commentId);
    setRenderComment(!renderComment);
  };

  return (
    <>
      <div className="card mb-2">
          <div className="card-body ">
              <CommentForm users={users} onSubmit={handleSubmit} />
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
