import flamenetLogo from "./flamenet-logo-white.png";
import detector from "./detector.png";
import defend from "./defend.png";
import dispatch from "./dispatch.png";
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
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 100, marginTop: 20}}>
    <div>
      <h1>Detect</h1>
      <img src={detector}/>
      </div>

    <div>
      <h1>Dispatch</h1>
      <img src={dispatch} width="400"/>
    </div>
    <div>
      <h1>Defend</h1>
      <img src={defend} width="195"/>
    </div>
  </div>

  return (
  <div className="App">
    <img className="logo" src={flamenetLogo} alt="FlameNet" />
    <Columns />
    <button class="button-30" onClick={dashboard}>View Example Dashboard</button>
    <a class="button-30" href="https://github.com/Tim-gubski/flamenet">View on Github</a>
  </div>
  );
};

export default Home;
