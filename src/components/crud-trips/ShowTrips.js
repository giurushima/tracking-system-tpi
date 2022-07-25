import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { db } from "../firebase/firebase-configDB";
import firebaseApp from "../firebase/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Show = () => {
  const [trips, setTrips] = useState([]);
  const [userPosition, setUserPosition] = useState([]);
  const [userName, setUserName] = useState([]);

  const tripsCollectionRef = collection(db, "trips");

  const getTrips = async () => {
    const getTripsData = await getDocs(tripsCollectionRef);
    setTrips(getTripsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getData = async (uid) => {
    const docRef = doc(firestore, `employees/${uid}`);
    const data = await getDoc(docRef);
    const positionData = data.data().position;
    return positionData;
  };
  const getName = async (uid) => {
    const docRef = doc(firestore, `employees/${uid}`);
    const data = await getDoc(docRef);
    const nameData = data.data().name;
    return nameData;
  };

  const setUserWithFirebaseAndRol = (userFirebase) => {
    getData(userFirebase.uid).then((position) => {
      const userData1 = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        position: position,
      };
      setUserPosition(userData1);
    });
    getName(userFirebase.uid).then((name) => {
      const userData2 = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        name: name,
      };
      setUserName(userData2);
    });
  };

  const deleteTrips = async (id) => {
    const userDoc = doc(db, "trips", id);
    await deleteDoc(userDoc);
    getTrips();
  };

  useEffect(() => {
    getTrips();

    onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUserWithFirebaseAndRol(userFirebase);
      } else {
        setUserPosition(null);
        setUserName(null);
      }
    });
  }, []);

  if (
    userPosition.position === "Administrador" ||
    userPosition.position === "Empleado"
  ) {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="d-grid gap-2">
                <Link to="/createTrips" className="btn btn-secondary mt-2 mb-2">
                  CARGAR VIAJE
                </Link>
              </div>
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Camionero</th>
                    <th>Estado del viaje</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((trip) => (
                    <tr key={trip.id}>
                      <td>{trip.source}</td>
                      <td>{trip.destiny}</td>
                      <td>{trip.truckDriverTrips}</td>
                      <td>{trip.tripStatus}</td>
                      <td>
                        <Link
                          to={`/editTrips/${trip.id}`}
                          className="btn btn-success"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => {
                            deleteTrips(trip.id);
                          }}
                          className="btn btn-danger"
                        >
                          Borrar
                        </button>
                        <Link to={"/Map"} className="btn btn-info">
                          Mapa
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  } else if (userPosition.position === "Camionero") {
    const filteredTrips = trips.filter(
      (trip) => trip.truckDriverTrips === userName.name
    );
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Camionero</th>
                    <th>Estado del viaje</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrips.map((trip) => (
                    <tr key={trip.id}>
                      <td>{trip.source}</td>
                      <td>{trip.destiny}</td>
                      <td>{trip.truckDriverTrips}</td>
                      <td>{trip.tripStatus}</td>
                      <td>
                        <Link
                          to={`/editTrips/${trip.id}`}
                          className="btn btn-success"
                        >
                          Editar
                        </Link>
                        <Link to={"/Map"} className="btn btn-info">
                          Mapa
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>NO TIENE ACCESO AUTORIZADO A ESTA PÁGINA</h1>
      </>
    );
  }
};

export default Show;
