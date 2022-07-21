import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase-configDB";

const Show = () => {
  const [trips, setTrips] = useState([]);

  const tripsCollectionRef = collection(db, "trips");

  const getTrips = async () => {
    const getTripsData = await getDocs(tripsCollectionRef);
    setTrips(getTripsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteTrips = async (id) => {
    const userDoc = doc(db, "trips", id);
    await deleteDoc(userDoc);
    getTrips();
  };

  useEffect(() => {
    getTrips();
  }, []);

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
                      <Link
                        to={"/Map"}
                        className="btn btn-info"
                      >
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
};

export default Show;
