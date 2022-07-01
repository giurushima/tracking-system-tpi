import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD9AtuOszeBDHoKjuDZ2v3sMQUWTThbju8",
  authDomain: "trucking-system-tpi.firebaseapp.com",
  projectId: "trucking-system-tpi",
  storageBucket: "trucking-system-tpi.appspot.com",
  messagingSenderId: "903694667578",
  appId: "1:903694667578:web:546edfc2d2be6728f48a03",
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
