// actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { api } from '../../api/axios';
import { putVideosSearched, setVideosRelated } from '../reducers/videos';
import { setVideoSelected } from '../reducers/videoSelected';

export const getInitialVideos = createAsyncThunk<{ state: RootState }>('videos/getInitialVideos', async () => {
  try {
    const response = await api.get('/videos/findAllVideos');
    if (response.data[0].videoId) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
});

export const getVideosByURLPlaylistId = createAsyncThunk<void, any | undefined, { state: RootState }>(
  'videos/getVideosURL',
  async ({ location }, { dispatch, getState }) => {
    try {
      console.log(getState().videoSelected);
      console.log(!getState().videos);

      // eslint-disable-next-line eqeqeq
      if (!getState().videoSelected?.videoId) {
        const params = new URLSearchParams(location.search);
        const playlistId = params.get('playlistId');
        const response = await api.post('/videos/findbyPlaylistId', { playlistId: playlistId });
        if (response.data[0].videoId) {
          dispatch(setVideosRelated(response.data));
          dispatch(setVideoSelected(response.data[0]));
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
);

export const getVideos = createAsyncThunk<void, any | undefined, { state: RootState }>(
  'videos/getVideos',
  async ({ searchValue, navigate }, { dispatch, getState }) => {
    if (searchValue.trim()) {
      try {
        const response = await api.post('/videos/findbyPlaylistId', { playlistId: searchValue });
        if (response.data[0].videoId) {
          navigate(`/watch?playlistId=${searchValue}`);
          dispatch(setVideosRelated(response.data));
        } else {
          throw new Error('No videos found');
        }
      } catch (error) {
        try {
          const filteredVideos = getState().videos?.filter((video: { title: string }) =>
            video.title.toLowerCase().includes(searchValue.toLowerCase()),
          );
          if (filteredVideos && filteredVideos.length > 0) {
            dispatch(putVideosSearched(filteredVideos));
          } else {
            throw new Error('No videos found locally');
          }
        } catch (error) {
          console.error('Error while filtering videos locally:', error);
          throw new Error('Failed to filter videos locally');
        }
      }
    } else {
      dispatch(getInitialVideos());
    }
  },
);
