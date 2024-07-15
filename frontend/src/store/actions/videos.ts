// actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/axios';
import { putVideosSearched, setVideoSelected, setVideosRelated } from '../reducers/videos';
import { Video } from '@/interfaces/Video';

export const getInitialVideos = createAsyncThunk('videos/getInitialVideos', async () => {
  try {
    const response = await api.get('/videos/findAllVideos');
    if (response.data[0].videoId) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
});

export const getVideosByURLPlaylistId = createAsyncThunk(
  'videos/getVideosURL',
  async ({ location }: any, { dispatch, getState }: any) => {
    try {
      // eslint-disable-next-line eqeqeq
      if (!getState().videoSelected?.videoId) {
        const params = new URLSearchParams(location.search);
        const playlistId = params.get('playlistId');
        const response = await api.post('/videos/findbyPlaylistId', { playlistId: playlistId });
        if (response.data[0].videoId) {
          return response.data;
        }
      }
    } catch (error) {
      throw new Error();

      console.log(error);
    }
  },
);

export const getVideos = createAsyncThunk(
  'videos/getVideos',
  async ({ searchValue, navigate }: any, { dispatch, getState }: any) => {
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
          const filteredVideos = getState().videos.videoState?.filter((video: { title: string }) =>
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
