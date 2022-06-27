import React from "react";
import { useState } from "react";
import "./Trips.css";

const Trips = () => {
  const [source, setSource] = useState("");
  const [destiny, setDestiny] = useState("");
  const [truckDriverTrips, setTruckDriverTrips] = useState("");
  const [tripStatus, setTripStatus] = useState("");

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
          />
          <br />
          <label htmlFor="source">DESTINO</label>
          <br />
          <input
            type="text"
            id="destiny"
            name="destiny"
            value={destiny}
            onChange={changeDestinyHandler}
          />
          <br />
          {/* ACA DEBERIAMOS ELEGIR EL NOMBRE DE USUARIO DE CAMIONERO QUE YA ESTAN CARGADOS*/}
          <label htmlFor="truckdriver">SELECCION DE CAMIONERO</label>
          <br />
          <select
            name="truckdriver"
            onChange={changeTruckDriverTripsHandler}
            defaultValue=""
          >
            <option value="">---</option>
            <option value="">---</option>
          </select>
          <br />
          <label htmlFor="tripstatus">ESTADO DEL VIAJE</label>
          <br />
          {/* ACA HAY QUE VER QUE IRIA DEL ESTADO DEL VIAJE 
        pendiente(cuando se carga en el form, se sube a la api) -
        confirmado
        realizado */}
          <select
            name="tripstatus"
            onChange={changeTripStatusHandler}
            defaultValue=""
          >
            <option value="">---</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Realizado">Realizado</option>
          </select>
          <br />
          <button type="submit" className="btn btn-primary" >CARGAR VIAJE</button>
        </div>
      </form>
    </>
  );
};

export default Trips;
