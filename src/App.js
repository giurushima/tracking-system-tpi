import Home from "./components/pages/Home";
import Trips from "./components/pages/Trips";
import Receipt from "./components/pages/Receipt";
import Employed from "./components/pages/Employed";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";
import { createContext, useState } from "react";

import "./App.css";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  const state = {
    session: true,
  }

  const changeTheme = () => {
    setTheme((item) => (item === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
    <div className="App" id={theme} >
      <div className="App-header">
        {state.session ? <NavBar /> : <Login />}
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Trips" element={<Trips />} />
          <Route path="/Employed" element={<Employed />} />
          <Route path="/Receipt" element={<Receipt />} />
          <Route path="/Login" element={state.session ? <Navigate to="/" replace /> :  <Login />}  />
        </Routes>
      </div>
      <div className="theme-input" >
      <label>{theme === "light" ? "Modo Claro" : "Modo Oscuro"}</label>
      <input type="checkbox" onChange={changeTheme} checked={theme === "dark"} />
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
