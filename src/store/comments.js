import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import commentsService from '../services/comment.service';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentRemove: (state, action) => {
      state.entities = state.entities.filter((comment) => comment._id !== action.payload);
    },
    commentCreate: (state, action) => {
      state.entities.push(action.payload);
    }
  }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const { commentsRequested, commentsReceved, commentsRequestFiled, commentRemove, commentCreate } = actions;

export const loadCommentsList = (id) => async (dispatch) => {
  dispatch(commentsRequested());

  try {
    const { content } = await commentsService.getComments(id);
    dispatch(commentsReceved(content));
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

export const removeComment = (id) => async (dispatch) => {
  try {
    const { content } = await commentsService.removeComment(id);
    if (content === null) {
      dispatch(commentRemove(id));
    }
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

export const createComment = ({ data, userId, currentUserId }) => async (dispatch) => {
  const comment = {
    _id: nanoid(),
    ...data,
    pageId: userId,
    created_at: Date.now(),
    userId: currentUserId
  };

  try {
    const { content } = await commentsService.createComment(comment);
    dispatch(commentCreate(content));
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;
export const getCommentsError = () => (state) => state.comments.error;

export default commentsReducer;
