import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc, getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseApp from "../firebase/firebase-config";
import { db } from "../firebase/firebase-configDB";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./EditTrips.css";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Edit = () => {
  const [source, setSource] = useState("");
  const [destiny, setDestiny] = useState("");
  const [truckDriver, setTruckDriver] = useState("");
  const [employees, setEmployees] = useState([]);
  const [tripStatus, setTripStatus] = useState("");
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const changeSourceHandler = (e) => {
    setSource(e.target.value);
  };
  const changeDestinyHandler = (e) => {
    setDestiny(e.target.value);
  };
  const changeTruckDriverHandler = (e) => {
    setTruckDriver(e.target.value);
  };
  const changeTripStatusHandler = (e) => {
    setTripStatus(e.target.value);
  };

  const updateTrips = async (e) => {
    e.preventDefault();
    const tripDoc = doc(db, "trips", id);
    const newFields = { source, destiny, tripStatus };
    await updateDoc(tripDoc, newFields);
    navigate("/trips");
  };

  const getTripsById = async (id) => {
    const trip = await getDoc(doc(db, "trips", id));
    if (trip.exists()) {
      console.log(trip.data());
      setSource(trip.data().source);
      setDestiny(trip.data().destiny);
      setTruckDriver(trip.data().truckDriverTrips);
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
      tripStatus,
    };
    return Data;
  };

  const getRol = async (uid) => {
    const docuRef = doc(firestore, `employees/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().position;
    return infoFinal;
  };

  const setUserWithFirebaseAndRol = (usuarioFirebase) => {
    getRol(usuarioFirebase.uid).then((position) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        position: position,
      };
      setUser(userData);
      console.log("userData fianl", userData);
    });
  };
  const usersCollectionRef = collection(db, "employees");

  const getUsers = async () => {
    const getEmployeesData = await getDocs(usersCollectionRef);
    setEmployees(
      getEmployeesData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getUsers();
    onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      } else {
        setUser(null);
      }
    });
  }, []);

  const filteredTruckers = employees.filter(
    (trucker) => trucker.position === "Camionero"
  );

  if (user.position === "Administrador" || user.position === "Empleado") {
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
                {errors?.destiny && (
                  <div className="red"> {errors.destiny} </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">CAMIONERO</label>
                <select
                name="tripTrucker"
                className="form-control"
                onChange={changeTruckDriverHandler}
                value={truckDriver}
              >
                {filteredTruckers.map((trucker) => (
                  <option key={trucker.id} value={trucker.name}>
                    {trucker.name}
                  </option>
                ))}
              </select>
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
  } else {
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
                  type="text"
                  className="form-control"
                />
                {errors?.source && <div className="red"> {errors.source} </div>}
              </div>
              <div className="mb-3">
                <label className="form-label">DESTINO</label>
                <input
                  placeholder="lugar de destino"
                  value={destiny}
                  type="text"
                  className="form-control"
                />
                {errors?.destiny && (
                  <div className="red"> {errors.destiny} </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">CAMIONERO</label>
                <select
                  name="tripTrucker"
                  className="form-control"
                  onChange={changeTruckDriverHandler}
                  value={truckDriver}
                >
                  {filteredTruckers.map((trucker) => (
                    <option key={trucker.id} value={trucker.name}>
                      {trucker.name}
                    </option>
                  ))}
                </select>
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
  }
};

export default Edit;
