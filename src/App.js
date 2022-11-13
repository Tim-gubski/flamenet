import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import okanaganNodeMap from "./nodemaps/okanagan-nodemap.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/fontawesome-free-brands";
import ImageMapper from "react-img-mapper";
import Dashboard from "./Dashboard";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";

const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  databaseURL: "***REMOVED***",
  projectId: "***REMOVED***",
  storageBucket: "***REMOVED***.appspot.com",
  messagingSenderId: "***REMOVED***",
  appId: "1:***REMOVED***:web:67aaeabbd8df3557cebb28",
  measurementId: "***REMOVED***",
};

function App() {
  const app = initializeApp(firebaseConfig);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
