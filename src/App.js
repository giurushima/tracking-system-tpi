import Home from "./components/pages/Home";
import Trips from "./components/pages/Trips";
import Receipt from "./components/pages/Receipt";
import Employed from "./components/pages/Employed";
import Login from "./components/Login";

import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/Trips" element={<Trips />} />
          <Route path="/pages/Employed" element={<Employed />} />
          <Route path="/pages/Receipt" element={<Receipt />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
