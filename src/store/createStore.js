import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commentsReducer from './comments';
import ProfessionsReducer from './professions';
import qualitiesReducer from './qualities';
import usersReducer from './users';

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: ProfessionsReducer,
  users: usersReducer,
  comments: commentsReducer
});

export function createStore () {
  return configureStore({
    reducer: rootReducer
  });
};
