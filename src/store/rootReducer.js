import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/localAuthSlice';
import websitesReducer from './slices/websitesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  websites: websitesReducer,
});

export default rootReducer;