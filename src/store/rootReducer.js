import { combineReducers } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
import authReducer from './slices/localAuthSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;