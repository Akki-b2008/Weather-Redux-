import { Route, Routes } from "react-router-dom";
import ForecastDataPage from "../page/forecastDataPage";
import Home from "../page/Home";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forecast" element={<ForecastDataPage />} />
    </Routes>
  );
};

export default MainRoutes;
