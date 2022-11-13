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
import flamenetLogo from "./flamenet-logo-white.png";

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

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <>
      {!isMobile && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      )}
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <center>
            <img
              className="logo"
              src={flamenetLogo}
              alt="FlameNet"
              style={{
                width: "70%",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            />
            <h3>
              Please visit this site from a comptuer to see the full content
            </h3>
          </center>
        </div>
      )}
    </>
  );
}

export default App;
