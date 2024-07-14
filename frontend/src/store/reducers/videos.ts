import { Video } from '@/interfaces/Video';
import { createSlice } from '@reduxjs/toolkit';
import { getInitialVideos, getVideos } from '../actions/videos';
import toast from 'react-hot-toast';

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
  extraReducers: (builder) => {
    builder
      .addCase(getInitialVideos.fulfilled, (state, { payload }) => {
        const newState = payload;
        console.log(newState);
        return newState;
      })
      .addCase(getInitialVideos.rejected, () => {
        toast.error('Failed to fetch initial videos');
      })
      .addCase(getVideos.rejected, (state, action) => {
        console.error(action.error);
        toast.error('Failed to fetch  videos');
      });
  },
});

export const { addVideosFromDataBase, putVideosSearched } = videosSlice.actions;

export default videosSlice.reducer;
