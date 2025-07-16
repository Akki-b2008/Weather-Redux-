import { useState } from "react";
import { asyncforecastDetails } from "../store/actions/forecastAction";
import asyncWeatherDetails from "../store/actions/weatherAction";
import thunder from "../assets/img/thunder.webp";
import getWeatherImages from "../components/DynamicImg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  ChevronRight,
  Droplets,
  MapPin,
  Search,
  Waves,
  Wind,
  ArrowRight,
  ChevronLeft,
  Calendar,
  RotateCw,
} from "lucide-react";
import Loader from "../components/loader/Loader";
import { motion } from "framer-motion";

const forecastDataPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const weather = useSelector((state) => state.weatherReducer.weather);
  const forecast = useSelector((state) => state.forecastReducer.forecast);
  console.log(weather);
  console.log(forecast);

  const [renderData, setRenderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dayWiseForecast = () => {
    const grouped = {};

    forecast?.list?.forEach((item) => {
      const date = item.dt_txt.split(" ")[0]; // "YYYY-MM-DD"
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });

    const todayDate = new Date().toISOString().split("T")[0];

    const final = Object.keys(grouped)
      .filter((date) => date !== todayDate)
      .splice(0, 5)
      .map((date) => {
        const entries = grouped[date];
        const totalTemp = entries.reduce(
          (acc, curr) => acc + curr.main.temp,
          0
        );
        const avgTemp = totalTemp / entries.length;
        console.log(entries);

        // Try to get 12:00 PM entry, otherwise take the middle one
        const noonEntry =
          entries.find((e) => e.dt_txt.includes("12:00:00")) ||
          entries[Math.floor(entries.length / 2)];

        const dt = new Date(noonEntry.dt_txt);
        const dateFormatted = dt.toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
        });

        return {
          date: dateFormatted, // like "Sat, 13 Jul"
          temp: avgTemp?.toFixed(1),
          time: dt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
      });
    console.log(final);

    return final;
  };

  useEffect(() => {
    const storedCity = JSON.parse(localStorage.getItem("city")) || "delhi";
    dispatch(asyncWeatherDetails(storedCity));
    dispatch(asyncforecastDetails(storedCity));

    const timer = setTimeout(() => {
      setLoading(false); // After 3 seconds
    }, 1300);

    return () => clearTimeout(timer);
  }, [dispatch, RotateCw]);

  useEffect(() => {
    if (forecast?.list?.length > 0) {
      const result = dayWiseForecast();
      setRenderData(result);
    }
  }, [forecast]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const backHandler = () => {
    navigate("/");
  };

  const refreshHandler = () => {
    setLoading(true);
    let currentCity = JSON.parse(localStorage.getItem("city"));
    dispatch(asyncWeatherDetails(currentCity));
    dispatch(asyncforecastDetails(currentCity));
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    forecast && (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className=" max-w-[500px] w-full h-[100vh] overflow-x-hidden bg-black"
        style={{ fontFamily: "Comfortaa" }}
      >
        <section
          className="flex flex-col justify-between pt-[1.3rem] h-fit  bg-gradient-to-b from-[#55b9f7] via-[#098afa] to-[#025bf6] rounded-bl-[50px] rounded-br-[50px] "
          style={{
            boxShadow: "0 100px 1px black",
          }}
        >
          <nav className="px-4 py-2 flex justify-between  items-center">
            <ChevronLeft
              onClick={backHandler}
              stroke="white"
              className="border-1 border-amber-50 rounded-3xl  w-[33px] h-[33px] p-1.5 cursor-pointer"
            />

            <div className="flex gap-1 items-center ">
              <Calendar size={16} stroke="white" />
              <p className="text-xl text-white mt-1">5 Days</p>
            </div>
            <RotateCw
              stroke="white"
              className="cursor-pointer"
              onClick={refreshHandler}
            />
          </nav>

          <div className=" p-4 flex flex-col text-white  overflow-x-hidden  ">
            <div className="flex items-center justify-between">
              <img
                src={getWeatherImages(weather?.weather[0].main)}
                alt="thunderStrom"
                style={{
                  width: "50%",
                  objectFit : "cover"
                }}
              />

              <div>
                <h1
                  style={{
                    lineHeight: "60px",
                    fontFamily: "helvetica",
                    textAlign: "center",
                    fontSize: "clamp(1rem, 10vw, 3rem)",
                  }}
                >
                  {weather?.main?.temp.toFixed(1)}
                  <span className="text-4xl text-[#e2d6d68c]">°c</span>
                </h1>

                <h2 className=" text-center text-2xl mb-2 text-[#e2d6d6e8]">
                  {weather?.weather[0]?.description}
                </h2>
              </div>
            </div>

            <hr className="mb-3 opacity-20" />

            <div className="flex justify-around font-semibold ">
              <div className=" px-2 text-[18px]">
                <Wind className="text-center m-auto" />
                <h3 className="text-center">{weather?.wind?.speed}km/h</h3>
                <p className="text-center m-auto text-[#d3d3d3a5]">Wind</p>
              </div>

              <div className=" px-2 text-[18px]">
                <Droplets className="text-center m-auto" />
                <h3 className="text-center">{weather?.main?.humidity}%</h3>
                <p className="text-center m-auto text-[#d3d3d3a5]">Humidity</p>
              </div>

              <div className=" px-2 text-[18px]">
                <Waves className="text-center m-auto" />
                <h3 className="text-center">{weather?.main?.pressure}hPa</h3>
                <p className="text-center m-auto text-[#d3d3d3a5]">Pressure</p>
              </div>
            </div>
          </div>
        </section>

        <div className="p-5  text-amber-50 flex flex-col gap-5 bg-black">
          <div className="flex flex-col justify-around">
            {renderData?.map((item, index) => (
              <div
                key={index}
                className="group flex justify-between leading-tight
                items-center  text-white "
              >
                <div>
                  <p className="text-[20px] text-[grey] group-hover:text-white">
                    {item.date}
                  </p>
                </div>

                <div><img src={thunder} alt="" className="w-[60px] " /></div>

                <div>
                  <h1 className="text-xl ">{item.temp}°C</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.main>
    )
  );
};

export default forecastDataPage;
