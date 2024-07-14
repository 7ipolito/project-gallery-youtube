// store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import videosReducer from './reducers/videos';
import videoSelectedReducer from './reducers/videoSelected';

const store = configureStore({
  reducer: {
    videos: videosReducer,
    videoSelected: videoSelectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
