import { asyncforecastDetails } from "../store/actions/forecastAction";
import asyncWeatherDetails from "../store/actions/weatherAction";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  Droplets,
  MapPin,
  Search,
  Waves,
  Wind,
  ArrowRight,
} from "lucide-react";
import Loader from "../components/loader/Loader";
import { motion } from "framer-motion";
import getWeatherImages from "../components/DynamicImg";

const Home = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weatherReducer.weather);
  const forecast = useSelector((state) => state.forecastReducer.forecast);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  function dateTime() {
    const timestamp = weather?.dt;
    const time = new Date(timestamp * 1000);
    const date = String(time.getDate()).padStart(2, "0");
    const month = String(time.getMonth() + 1).padStart(2, "0");
    const year = String(time.getFullYear());
    return [date, "/", month, "/", year].join("");
  }

  const renderData = forecast?.list?.slice(2, 7).map((val) => {
    const dt = new Date(val.dt_txt);
    const datePart = dt.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
    const timePart = dt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return {
      temp: val.main.temp.toFixed(1),
      date: datePart,
      time: timePart,
      weatherType: val.weather[0].main,
    };
  });

  useEffect(() => {
    const storedCity = JSON.parse(localStorage.getItem("city")) || "delhi";

    if (!weather || !forecast) {
      setLoading(true);
      dispatch(asyncWeatherDetails(storedCity));
      dispatch(asyncforecastDetails(storedCity));

      setTimeout(() => {
        setLoading(false);
      }, 1300);
    } else {
      setLoading(false); // immediately show
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    const city = data?.city?.trim();
    if (!city) return;

    const res1 = await dispatch(asyncWeatherDetails(city));
    dispatch(asyncforecastDetails(city));

    const msg = res1?.data?.message;
    const cod = res1?.data?.cod;

    console.log(res1);

    if (res1?.status === 404 || cod === "404") {
      setErrorMsg(msg || "City not found");
      reset({ city: "" });
      setTimeout(() => setErrorMsg(""), 2000);
    } else {
      setErrorMsg("");
      reset();
    }
  };

  if (loading || !forecast?.list?.length) {
    return <Loader />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="  max-w-[500px] w-full h-[100vh] overflow-x-hidden  bg-black"
      style={{ fontFamily: "Comfortaa" }}
    >
      <section className="pt-5  bg-gradient-to-b from-[#55b9f7] via-[#098afa] to-[#025bf6]">
        <nav className=" relative mx-5 flex rounded-xl justify-between items-center  bg-white/10 backdrop-blur-md  shadow-md border border-white/20">
          <div className="w-[100%] flex gap-2 items-center bg-white/20 px-3 py-2 rounded-lg border border-white/30 shadow-inner">
            <Search size="18px" className="text-white" />
            <form onSubmit={handleSubmit(submitHandler)} className="flex">
              <input
                type="text"
                placeholder="Search"
                {...register("city", { required: true })}
                className="bg-transparent text-white placeholder-white/70 outline-none w-full text-sm"
              />
              <button type="submit" className="absolute right-2 bottom-1.5">
                <ArrowRight stroke="white" className="mr-1" />
              </button>
            </form>
          </div>
        </nav>

        {errors.city && (
          <p className="text-red-400 text-xs mt-1">
            Please enter a valid city name
          </p>
        )}
        <p className="text-[#ffda089d] text-xl mx-5 mt-2 text font-bold">
          {errorMsg}
        </p>

        <div
          className=" p-4  rounded-bl-[50px] rounded-br-[50px] text-white pt-[1.3rem] overflow-x-hidden  "
          style={{
            boxShadow: "0 100px 1px black",
          }}
        >
          <span className="inline-flex justify-self-start gap-1">
            <MapPin stroke="white" />
            <h2 className="text-xl"> {weather?.name}</h2>
          </span>

          <img
            src={getWeatherImages(weather?.weather[0].main)}
            alt="thunderStrom"
            className="p-0 m-auto"
            style={{
              width: "50%",
            }}
          />

          <h1
            style={{
              lineHeight: "70px",
              fontFamily: "helvetica",
              textAlign: "center",
              fontSize: "clamp(1rem, 60vw, 7rem)",
            }}
          >
            {weather?.main?.temp.toFixed(1)}
            <span className="text-4xl text-[#e2d6d68c]">°c</span>
          </h1>

          <h2 className="mt-2 text-center text-3xl text-[#e2d6d6e8]">
            {weather?.weather[0]?.description}
          </h2>

          <p className=" text-center text-xl text-[#e2d6d697] mb-2">
            {dateTime()}
          </p>

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

      <div className="p-5 text-amber-50 flex flex-col gap-5 bg-black">
        <div className="flex justify-between items-center">
          <h2 className="font-[600] text-[1.7em]">Today</h2>

          <NavLink
            to={"/forecast"}
            className="inline-flex items-center text-[grey] text-[1.2rem] cursor-pointer border-b border-b-transparent hover:scale-[1.1] transtion-all duration-100 ease-in"
          >
            <p>5 Days</p>
            <ChevronRight />
          </NavLink>
        </div>

        <div className=" flex justify-around overflow-x-auto py-2 px-2 gap-3">
          {renderData?.length > 0 &&
            renderData?.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col justify-center leading-tight p-3 items-center bg-[#0f0f13] text-white border-[1px] rounded-3xl border-[#d7cdcd44] 
                hover:bg-gradient-to-b hover:from-[#1598ea] hover:to-[#1568f8] hover:border-[#cfcdcd80] hover:border-[1.5px] hover:scale-105 transition-all duration-500"
              >
                <div>
                  <h1 className="text-xl ">{item.temp}°C</h1>
                </div>

                <div>
                  <img
                    src={getWeatherImages(item.weatherType)}
                    alt=""
                    className="w-[80px] "
                  />
                </div>

                <div>
                  <p className="text-[13px] text-[grey] group-hover:text-white">
                    {item.time}
                  </p>
                  <p className="text-[13px] text-[grey] group-hover:text-white">
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </motion.main>
  );
};

export default Home;
