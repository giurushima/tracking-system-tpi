import Show from "../crud/Show";
import Edit from "../crud/Edit";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Employed = () => {
  const [userPosition, setUserPosition] = useState([]);

  const getData = async (uid) => {
    const docRef = doc(firestore, `employees/${uid}`);
    const data = await getDoc(docRef);
    const positionData = data.data().position;
    return positionData;
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
  };
  useEffect(() => {
    onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUserWithFirebaseAndRol(userFirebase);
      } else {
        setUserPosition(null);
      }
    });
  }, []);

  if (userPosition.position === "Administrador") {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Show />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <>
        <h1>NO TIENE ACCESO AUTORIZADO A ESTA PÁGINA</h1>
      </>
    );
  }
};

export default Employed;
