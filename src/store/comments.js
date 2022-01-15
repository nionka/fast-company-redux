import { createSlice } from '@reduxjs/toolkit';
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
    }
  }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const { commentsRequested, commentsReceved, commentsRequestFiled } = actions;

export const loadCommentsList = (id) => async (dispatch) => {
  dispatch(commentsRequested());

  try {
    const { content } = await commentsService.getComments(id);
    dispatch(commentsReceved(content));
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;
export const getCommentsError = () => (state) => state.comments.error;

export default commentsReducer;
