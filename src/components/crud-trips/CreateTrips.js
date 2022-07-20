import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-configDB";

import "./Edit.css";

const Edit = () => {
  const [source, setSource] = useState("");
  const [destiny, setDestiny] = useState("");
  const [truckDriverTrips, setTruckDriverTrips] = useState("");
  const [tripStatus, setTripStatus] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const tripsCollectionRef = collection(db, "trips");

  const changeSourceHandler = (e) => {
    setSource(e.target.value);
  };
  const changeDestinyHandler = (e) => {
    setDestiny(e.target.value);
  };
  const changeTruckDriverTripsHandler = (e) => {
    setTruckDriverTrips(e.target.value);
  };
  const changeTripStatusHandler = (e) => {
    setTripStatus(e.target.value);
  };

  const createTrips = async (e) => {
    e.preventDefault();
    await addDoc(tripsCollectionRef, {
      source,
      destiny,
      truckDriverTrips,
      tripStatus,
    });
    navigate("/trips");
  };

  const validationRequirementsTrips = {
    source: { required: true },
    destiny: { required: true },
    truckDriverTrips: { required: true },
    tripStatus: { required: true },
  };

  const validate = (tripsObject) => {
    let errors = {};
    if (tripsObject) {
      Object.keys(validationRequirementsTrips).forEach((key) => {
        if (validationRequirementsTrips[key].required && !tripsObject[key]) {
          errors[key] = "El campo es obligatorio.";
        }
      });
    }
    return errors;
  };

  const generateObjectTrips = () => {
    const Data = {
      source,
      destiny,
      truckDriverTrips,
      tripStatus,
    };
    return Data;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>CARGAR VIAJE</h1>
          <form onSubmit={createTrips}>
            <div className="mb-3">
              <label className="form-label">ORIGEN</label>
              <input
                placeholder="lugar de origen"
                value={source}
                onChange={changeSourceHandler}
                type="text"
                className="form-control"
                onBlur={(e) => {
                  setErrors(validate(generateObjectTrips()));
                }}
              />
              {errors?.source && <div className="red"> {errors.source} </div>}
            </div>
            <div className="mb-3">
              <label className="form-label">DESTINO</label>
              <input
                placeholder="lugar de destino"
                value={destiny}
                onChange={changeDestinyHandler}
                type="text"
                className="form-control"
                onBlur={(e) => {
                  setErrors(validate(generateObjectTrips()));
                }}
              />
              {errors?.destiny && <div className="red"> {errors.destiny} </div>}
            </div>
            <div className="mb-3">
              <label className="form-label">CAMIONERO</label>
              <input
                placeholder="nombre y apellido"
                value={truckDriverTrips}
                onChange={changeTruckDriverTripsHandler}
                type="text"
                className="form-control"
                onBlur={(e) => {
                  setErrors(validate(generateObjectTrips()));
                }}
              />
              {errors?.truckDriverTrips && (
                <div className="red"> {errors.truckDriverTrips} </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">ESTADO DEL VIAJE</label>
              <select
                name="tripstatus"
                className="form-control"
                value={tripStatus}
                onChange={changeTripStatusHandler}
                onBlur={(e) => {
                  setErrors(validate(generateObjectTrips()));
                }}
              >
                <option value="">---</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Realizado">Realizado</option>
              </select>
              {errors?.tripStatus && (
                <div className="red"> {errors.tripStatus} </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              CARGAR VIAJE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
