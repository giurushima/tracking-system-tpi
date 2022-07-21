import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase-configDB";

import "./EditTrips.css";

const Edit = () => {
  const [source, setSource] = useState("");
  const [destiny, setDestiny] = useState("");
  const [truckDriverTrips, setTruckDriverTrips] = useState("");
  const [tripStatus, setTripStatus] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

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

  const updateTrips = async (e) => {
    e.preventDefault();
    const tripDoc = doc(db, "trips", id);
    const newFields = { source, destiny, truckDriverTrips, tripStatus };
    await updateDoc(tripDoc, newFields);
    navigate("/trips");
  };

  const getTripsById = async (id) => {
    const trip = await getDoc(doc(db, "trips", id));
    if (trip.exists()) {
      console.log(trip.data());
      setSource(trip.data().source);
      setDestiny(trip.data().destiny);
      setTruckDriverTrips(trip.data().truckDriverTrips);
      setTripStatus(trip.data().tripStatus);
    } else {
      console.log("El viaje no existe");
    }
  };

  useEffect(() => {
    getTripsById(id);
  }, []);

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
          <div className="editTrips">
            <h1>EDITAR VIAJE</h1>
          </div>
          <form onSubmit={updateTrips}>
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
              ACTUALIZAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
