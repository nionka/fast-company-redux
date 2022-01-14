import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ProfessionsReducer from './professions';
import qualitiesReducer from './qualities';

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: ProfessionsReducer
});

export function createStore () {
  return configureStore({
    reducer: rootReducer
  });
};
