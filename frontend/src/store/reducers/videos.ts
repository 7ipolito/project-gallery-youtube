import { Video } from '@/interfaces/Video';
import { createSlice } from '@reduxjs/toolkit';
import { getInitialVideos, getVideos, getVideosByURLPlaylistId } from '../actions/videos';
import toast from 'react-hot-toast';

const videoState: Video[] = [];
const videoRelatedState: any = [];
const videoSelectedState = {};
const isLoadingState = true;

const videosSlice = createSlice({
  name: 'videos',
  initialState: {
    videoState,
    videoRelatedState,
    videoSelectedState,
    isLoadingState,
  },
  reducers: {
    addVideosFromDataBase: (state, { payload }) => {
      state.videoState = payload;
    },
    putVideosSearched: (state, { payload }) => {
      state.videoState = payload;
    },
    setVideosRelated: (state, { payload }) => {
      state.videoRelatedState = payload;
    },
    setVideoSelected: (state, { payload }) => {
      console.log(payload);
      state.videoSelectedState = { payload };
    },
  },
  extraReducers: (builder) => {
    //GET INITIAL VIDEOS
    builder
      .addCase(getInitialVideos.pending, (state, _) => {
        state.isLoadingState = true;
      })
      .addCase(getInitialVideos.rejected, (state, _) => {
        toast.error('Failed to fetch initial videos');
        state.isLoadingState = false;
      })
      .addCase(getInitialVideos.fulfilled, (state, { payload }) => {
        state.videoState = payload;
        state.isLoadingState = false;
      })
      //GET VIDEOS
      .addCase(getVideos.pending, (state, _) => {
        state.isLoadingState = true;
      })
      .addCase(getVideos.rejected, (state, action) => {
        console.error(action.error);
        toast.error('Failed to fetch videos');
        state.isLoadingState = false;
      })
      .addCase(getVideos.fulfilled, (state, { payload }) => {
        state.videoRelatedState = payload;
        state.isLoadingState = false;
      })
      //GetVideosByURLPlaylistId
      .addCase(getVideosByURLPlaylistId.pending, (state, _) => {
        state.isLoadingState = true;
      })
      .addCase(getVideosByURLPlaylistId.rejected, (_, action) => {
        console.error(action.error);
        toast.error('Failed to fetch videos');
      })
      .addCase(getVideosByURLPlaylistId.fulfilled, (state, { payload }) => {
        state.videoRelatedState = payload;
        state.videoSelectedState = payload[0];
        state.isLoadingState = false;
      });
  },
});

export const { addVideosFromDataBase, putVideosSearched, setVideosRelated, setVideoSelected } = videosSlice.actions;

export default videosSlice.reducer;
