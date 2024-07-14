import { Video } from '@/interfaces/Video';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {};

// Crie o slice
const videoSelectSlice = createSlice({
  name: 'videoSelected',
  initialState,
  reducers: {
    setVideoSelected: (state, action: PayloadAction<Video>) => {
      const newState = action.payload;
      console.log(action);
      return newState;
    },
  },
});

// Exporte as ações e o reducer
export const { setVideoSelected } = videoSelectSlice.actions;

export default videoSelectSlice.reducer;
