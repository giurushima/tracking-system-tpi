import Home from "./components/pages/Home";
import Trips from "./components/pages/Trips";
import Map from "./components/pages/Map";
import Employed from "./components/pages/Employed";
import Login from "./components/pages/Login";
import Navbar from "./components/NavBar";
import Show from "./components/crud/Show";
import Edit from "./components/crud/Edit";
import ShowTrips from "./components/crud-trips/ShowTrips";
import CreateTrips from "./components/crud-trips/CreateTrips";
import EditTrips from "./components/crud-trips/EditTrips";
import PageNotFound from "./components/not-found/PageNotFound";

import { Route, Routes, Navigate } from "react-router-dom";
import { createContext, useState } from "react";

import "./App.css";

import firebaseApp from "./components/firebase/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
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
        <div className="app-header">
          {user ? <Navbar /> : console.log("Error al iniciar sesión")}
        </div>
        <div>
          <Routes>
            <Route
              path="/Home"
              element={user ? <Home /> : <Navigate to="/" replace />}
            />
            <Route
              path="/Trips"
              element={user ? <Trips /> : <Navigate to="/" replace />}
            />
            <Route
              path="/Employed"
              element={user ? <Employed /> : <Navigate to="/" replace />}
            />
            <Route
              path="/Map"
              element={user ? <Map /> : <Navigate to="/" replace />}
            />
            <Route
              path="/"
              element={user ? <Navigate to="/Home" replace /> : <Login />}
            />

            <Route path="/" element={<ShowTrips />} />
            <Route
              path="/createTrips"
              element={user ? <CreateTrips /> : <Navigate to="/" replace />}
            />
            <Route
              path="/editTrips/:id"
              element={user ? <EditTrips /> : <Navigate to="/" replace />}
            />

            <Route path="/" element={<Show />} />
            <Route
              path="/edit/:id"
              element={user ? <Edit /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<PageNotFound />} />
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
