import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { useAuth } from './useAuth';
import commentsService from '../services/comment.service';

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setComments([]);
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    getComments();
  }, [userId]);

  async function createComment (data) {
    const comment = {
      _id: nanoid(),
      ...data,
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    };

    try {
      const { content } = await commentsService.createComment(comment);
      console.log(content);
      setComments((prev) => ([...prev, content]));
    } catch (error) {
      errorCather(error);
    }
  }

  async function getComments () {
    try {
      const { content } = await commentsService.getComments(userId);
      setComments(content);
    } catch (error) {
      errorCather(error);
    } finally {
      setLoading(false);
    }
  };

  async function removeComment (id) {
    try {
      const { content } = await commentsService.removeComment(id);
      if (content === null) {
        setComments((prev) => prev.filter((com) => com._id !== id));
      }
    } catch (error) {
      errorCather(error);
    }
  }

  function errorCather (error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  return (
    <CommentsContext.Provider value={{ comments, createComment, removeComment, isLoading }}>
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default CommentsProvider;
