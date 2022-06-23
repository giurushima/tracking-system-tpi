import React from "react";
import { useState } from "react";

const Trips = () => {
  const [source, setSource] = useState("");
  const [destiny, setDestiny] = useState("");
  const [truckdriver, setTruckDriver] = useState("");
  const [tripstatus, setTripStatus] = useState("");

  return (
    <>
      <h1>Formulario</h1>
      <form>
        <label htmlFor="source">ORIGEN</label>
        <br />
        <input
          type="text"
          id="source"
          name="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <br />
        <label htmlFor="source">DESTINO</label>
        <br />
        <input
          type="text"
          id="destiny"
          name="destiny"
          value={destiny}
          onChange={(e) => setDestiny(e.target.value)}
        />
        <br />
        {/* ACA DEBERIAMOS ELEGIR EL NOMBRE DE USUARIO DE CAMIONERO QUE YA ESTAN CARGADOS*/}
        <label htmlFor="truckdriver">SELECCION DE CAMIONERO</label>
        <br />
        <select
          name="truckdriver"
          onChange={(e) => setTruckDriver(e.target.value)}
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
          onChange={(e) => setTripStatus(e.target.value)}
          defaultValue=""
        >
          <option value="">---</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Confirmado">Confirmado</option>
          <option value="Realizado">Realizado</option>
        </select>
        <br />
        <button type="submit">CARGAR VIAJE</button>
      </form>
    </>
  );
};

export default Trips;
