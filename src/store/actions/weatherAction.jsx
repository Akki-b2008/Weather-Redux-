import axios from "../../utils/axiosconfig";
import { loadweather } from "../reducers/weatherSlice";

const asyncWeatherDetails = (city) => async (dispatch) => {
  try {
    const {data}= await axios.get(
      `/weather?q=${city}&units=metric&appid=da4194102ae0dc773e53ad7a8baa167a`
    );
    localStorage.setItem("city", JSON.stringify(city));
    dispatch(loadweather(data));
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export default asyncWeatherDetails;
