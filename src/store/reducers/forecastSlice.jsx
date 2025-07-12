import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forecast: null,
};

const forecastSlice = createSlice({
  initialState,
  name: "forecast",
  reducers: {
    loadforecast: (state, action) => {
      state.forecast = action.payload;
    },
  },
});

export default forecastSlice.reducer

export const {loadforecast} = forecastSlice.actions