import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weather: null,
};

const weatherSlice = createSlice({
  initialState,
  name: "weather",
  reducers: {
    loadweather: (state, action) => {
      state.weather = action.payload;
    },
  },
});

export default weatherSlice.reducer;

export const { loadweather } = weatherSlice.actions;
