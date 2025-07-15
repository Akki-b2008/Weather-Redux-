import thunder from "../assets/img/thunder.webp";
import rain from "../assets/img/rain.webp";
import clearSky from "../assets/img/clearSky.webp";
import cloud from "../assets/img/cloud.webp";

  const getWeatherImages = (type) => {
    switch (type?.toLowerCase()) {
      case "clear":
        return clearSky;

      case "rain":
        return rain;

      case "thunderstorm":
        return thunder;

      case "clouds":
        return cloud;

      default:
        return clearSky;
    }
  };

export default getWeatherImages;
