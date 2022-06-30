import Home from "./components/pages/Home";
import Trips from "./components/pages/Trips";
import Receipt from "./components/pages/Receipt";
import Employed from "./components/pages/Employed";
import Login from "./components/auth/Login";
import NavBar from "./components/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";


function App() {

  const session = false;


  return (
    <div className="App">
      <header className="App-header">
        {session ? <NavBar /> : <Login />}
      </header>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Trips" element={<Trips />} />
          <Route path="/Employed" element={<Employed />} />
          <Route path="/Receipt" element={<Receipt />} />
          <Route path="/Login" element={session ? <Navigate to="/" replace /> :  <Login />}  />
        </Routes>
      </div>
    </div>
  );
}

export default App;
