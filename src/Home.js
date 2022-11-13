import flamenetLogo from "./flamenet-logo.png";
import detector from "./detector.png";
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/fontawesome-free-brands";

const Home = () => {
  useEffect(() => {
    document.title = 'FlameNet Homepage';
  }, []);

  let navigate = useNavigate(); 
  const dashboard = () =>{ 
    let path = `/dashboard`; 
    navigate(path);
  }

  const Columns = () => 
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 300}}>
    <div>
      <h1>Detect</h1>
      <img src={detector}/>
      </div>

    <div><h1>Dispatch</h1></div>
    <div><h1>Defend</h1></div>
  </div>

  return (
  <div className="App">
    <img className="logo" src={flamenetLogo} alt="FlameNet" />
    <Columns />
    <button class="button-78" onClick={dashboard}>View Example Dashboard</button>
    <a class="button-78" href="https://github.com/Tim-gubski/flamenet">View on Github</a>
  </div>
  );
};

export default Home;
