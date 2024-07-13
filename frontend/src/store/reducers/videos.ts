import { Video } from '@/interfaces/Video';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Video[] = [];

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    addVideosFromDataBase: (state, { payload }) => {
      const newState = payload;
      console.log(newState);
      return newState;
    },
    putVideosSearched: (state, { payload }) => {
      const newState = payload;

      return newState;
    },
  },
});

export const { addVideosFromDataBase, putVideosSearched } = videosSlice.actions;

export default videosSlice.reducer;
