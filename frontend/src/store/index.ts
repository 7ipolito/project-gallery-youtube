import { configureStore } from '@reduxjs/toolkit';
import videosSlice from './reducers/videos';

const store = configureStore({
  reducer: {
    videos: videosSlice,
  },
});

export default store;
