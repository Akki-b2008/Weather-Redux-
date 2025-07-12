import { configureStore } from "@reduxjs/toolkit";
import forecastSlice from "./reducers/forecastSlice";
import weatherSlice from "./reducers/weatherSlice";

const store = configureStore({
  reducer: {
    forecastReducer: forecastSlice,
    weatherReducer: weatherSlice,
  },
});
export default store;
