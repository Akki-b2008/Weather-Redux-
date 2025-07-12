import axios from "../../utils/axiosconfig";
import { loadweather } from "../reducers/weatherSlice";

const asyncWeatherDetails = (city) => async (dispatch) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  try {
    const {data}= await axios.get(
      `/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    localStorage.setItem("city", JSON.stringify(city));
    dispatch(loadweather(data));
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export default asyncWeatherDetails;
