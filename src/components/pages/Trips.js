import ShowTrips from "../crud-trips/ShowTrips";
import CreateTrips from "../crud-trips/CreateTrips";
import EditTrips from "../crud-trips/EditTrips";

import { Route, Routes } from "react-router-dom";

const Trips = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ShowTrips />} />
        <Route path="/createTrips" element={<CreateTrips />} />
        <Route path="/editTrips/:id" element={<EditTrips />} />
      </Routes>
    </div>
  );
};

export default Trips;
