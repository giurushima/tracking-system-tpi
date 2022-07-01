import Home from "./components/pages/Home";
import Trips from "./components/pages/Trips";
import Receipt from "./components/pages/Receipt";
import Employed from "./components/pages/Employed";
import Login from "./components/pages/Login";
import Navbar from "./components/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";
import { createContext, useState } from "react";

import "./App.css";

import firebaseApp from "./components/firebase/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const [session, setSession] = useState(false);
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase);
    } else {
      setUser(null);
    }
  });

  const changeTheme = () => {
    setTheme((item) => (item === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div className="App" id={theme}>
        <div className="app-header">{user ? <Home /> : <Login />}</div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Trips" element={<Trips />} />
            <Route path="/Employed" element={<Employed />} />
            <Route path="/Receipt" element={<Receipt />} />
            <Route
              path="/Login"
              element={session ? <Navigate to="/" replace /> : <Login />}
            />
          </Routes>
        </div>
        <div className="theme-input">
          <label>{theme === "light" ? "Modo Claro" : "Modo Oscuro"}</label>
          <input
            type="checkbox"
            onChange={changeTheme}
            checked={theme === "dark"}
          />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
