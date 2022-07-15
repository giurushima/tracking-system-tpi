import Show from "../crud/Show";
import Create from "../crud/Create";
import Edit from "../crud/Edit";

import { Route, Routes } from "react-router-dom";

const Employed = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Show />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default Employed;
