import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import gymReducer from './slices/gymSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gyms: gymReducer,
  },
});

export default store;
