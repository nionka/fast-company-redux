import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import userService from '../services/user.service';
import generateAuthError from '../utils/generateAuthErrors';
import history from '../utils/history';
import { rundomImg } from '../utils/rundomImg';

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    };

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdate: (state, action) => {
      state.entities = state.entities.map((user) => {
        if (user._id === action.payload._id) {
          return action.payload;
        }
        return user;
      });
    },
    authRequested: (state) => {
      state.error = null;
    }
  }
});

const { actions, reducer: usersReducer } = userSlice;
const {
  usersRequested,
  usersReceved,
  usersRequestFiled,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdate
} = actions;

const authRequested = createAction('users/authRequested');
const userCreateRequested = createAction('users/userCreateRequested');
const createUserFailed = createAction('users/createUserFailed');
const updateUserRequested = createAction('users/updateUserRequested');
const updateUserFailed = createAction('users/updateUserFailed');

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const createUser = (payload) => async (dispatch) => {
  dispatch(userCreateRequested());

  try {
    const { content } = await userService.create(payload);
    dispatch(userCreated(content));
    history.push('/users');
  } catch (error) {
    dispatch(createUserFailed(error.message));
  }
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch(updateUserRequested());
  try {
    const { content } = await userService.update(payload);
    dispatch(userUpdate(content));
  } catch (error) {
    dispatch(updateUserFailed());
  }
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());

  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};

export const logIn = ({ payload, redirect }) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.localId }));
    history.push(redirect);
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register({ email, password });
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.localId }));
    dispatch(createUser({
      _id: data.localId,
      email,
      rate: randomInt(1, 5),
      completedMeetings: randomInt(0, 200),
      image: rundomImg(),
      ...rest
    }));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push('/');
};

export const getUsersList = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthError = () => (state) => state.users.error;
export const getLoggetIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurrentUserData = () => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((user) => user._id === state.users.auth.userId);
  }
  return null;
};
export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((user) => user._id === userId);
  }
  return null;
};

export default usersReducer;
