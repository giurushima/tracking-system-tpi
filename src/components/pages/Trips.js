import React from "react";
import { useState } from "react";
import "./Trips.css";

const Trips = () => {
  const [source, setSource] = useState("");
  const [destiny, setDestiny] = useState("");
  const [truckDriverTrips, setTruckDriverTrips] = useState("");
  const [tripStatus, setTripStatus] = useState("");
  const [errors, setErrors] = useState(null);

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

  const Data = [
    { id: 123, name: "Prueba 1", adress: "1 Address" },
    { id: 124, name: "Prueba 2", adress: "2 Address" },
    { id: 125, name: "Prueba 3", adress: "3 Address" },
  ];

  return (
    <>
      <form className="form-Trips">
        <div className="inputs-trips">
          <h1>VIAJES</h1>

          <label htmlFor="source">ORIGEN</label>
          <br />
          <input
            type="text"
            id="source"
            name="source"
            value={source}
            onChange={changeSourceHandler}
            onBlur={(e) => {
              setErrors(validate(generateObjectTrips()));
            }}
          />
          {errors?.source && <div className="red"> {errors.source} </div>}
          <br />
          <label htmlFor="source">DESTINO</label>
          <br />
          <input
            type="text"
            id="destiny"
            name="destiny"
            value={destiny}
            onChange={changeDestinyHandler}
            onBlur={(e) => {
              setErrors(validate(generateObjectTrips()));
            }}
          />
          {errors?.destiny && <div className="red"> {errors.destiny} </div>}
          <br />
          {/* ACA DEBERIAMOS ELEGIR EL NOMBRE DE USUARIO DE CAMIONERO QUE YA ESTAN CARGADOS*/}
          <label htmlFor="truckdriver">SELECCION DE CAMIONERO</label>
          <br />
          <select
            name="truckdriver"
            value={truckDriverTrips}
            onChange={changeTruckDriverTripsHandler}
            onBlur={(e) => {
              setErrors(validate(generateObjectTrips()));
            }}
          >
            {Data.map((element) => (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            ))}
          </select>
          {errors?.truckDriverTrips && (
            <div className="red"> {errors.truckDriverTrips} </div>
          )}
          <br />
          <label htmlFor="tripstatus">ESTADO DEL VIAJE</label>
          <br />
          {/* ACA HAY QUE VER QUE IRIA DEL ESTADO DEL VIAJE 
        pendiente(cuando se carga en el form, se sube a la api) -
        confirmado
        realizado */}
          <select
            name="tripstatus"
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
          <br />
          <button type="submit" className="btn btn-primary">
            CARGAR VIAJE
          </button>
        </div>
      </form>
    </>
  );
};

export default Trips;
