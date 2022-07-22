import Show from "../crud/Show";
import Edit from "../crud/Edit";

import { Route, Routes } from "react-router-dom";

const Employed = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Show />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default Employed;
