// actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { api } from '../../api/axios';

import { addVideosFromDataBase, putVideosSearched } from '../reducers/videos';

export const getInitialVideos = createAsyncThunk<void, void, { state: RootState }>(
  'videos/getInitialVideos',
  async () => {
    try {
      const response = await api.get('/videos/findAllVideos');
      if (response.data[0].videoId) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  },
);

export const getVideos = createAsyncThunk<void, string | undefined, { state: RootState }>(
  'videos/getVideos',
  async (searchValue, { dispatch, getState }) => {
    if (searchValue) {
      try {
        const response = await api.post('/videos/findbyPlaylistId', { playlistId: searchValue });
        if (response.data[0].videoId) {
          // navigate(`/watch?playlistId=${searchValue}`);
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
      throw new Error('Search value is empty');
    }
  },
);
