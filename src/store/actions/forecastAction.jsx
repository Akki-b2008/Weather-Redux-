import axios from "../../utils/axiosconfig";
import { loadforecast } from "../reducers/forecastSlice";

export const asyncforecastDetails = (city) => async(dispatch) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  try {
    const { data } =await axios.get(`/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    dispatch(loadforecast(data))
  } catch (error) {
    console.log(error);
    return error.response;
    
  }
};
// `/forecast?q=${city}&units=metric&appid=da4194102ae0dc773e53ad7a8baa167a`