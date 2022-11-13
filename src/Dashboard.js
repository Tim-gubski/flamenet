import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import flamenetLogo from "./flamenet-logo.png";
import okanaganNodeMap from "./nodemaps/okanagan-nodemap.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/fontawesome-free-brands";
import ImageMapper from "react-img-mapper";

const Dashboard = () => {
  const db = getDatabase();
  const starCountRef = ref(db, "nodes");

  let [nodeData, setNodeData] = useState([]);

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setNodeData(data);
      console.log(data);
    });
  }, []);
  const MAP = {
    name: "my-map",
    // GET JSON FROM BELOW URL AS AN EXAMPLE
    areas: [
      {
        shape: "circle",
        coords: [105, 80, 8],
        preFillColor:
          nodeData["node1"]?.status == "on fire" ? "#d84c2c" : "green",
      },
      {
        shape: "circle",
        coords: [185, 50, 8],
        preFillColor:
          nodeData["node2"]?.status == "on fire" ? "#d84c2c" : "green",
      },
      {
        shape: "circle",
        coords: [273, 25, 8],
        preFillColor:
          nodeData["node3"]?.status == "on fire" ? "#d84c2c" : "green",
      },
    ],
  };

  return (
    <div className="App">
      <img className="logo" src={flamenetLogo} alt="FlameNet" />
      <h1>Okanagan Nodemap:</h1>
      <ImageMapper src={okanaganNodeMap} map={MAP} />
      <table id="rcorners1">
        <thead>
          <tr>
            <th>Node Name</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(nodeData).map((key) => {
            return (
              <tr
                className={
                  nodeData[key]?.status == "on fire"
                    ? "fire"
                    : nodeData[key]?.status == "not on fire"
                    ? "no-fire"
                    : "pass"
                }
              >
                <td>{key}</td>
                <td>{nodeData[key]?.location}</td>
                <td>{nodeData[key]?.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="links">
        <div data-id="github">
          <a href="https://github.com/Tim-gubski/flamenet">
            <FontAwesomeIcon className="icon" icon={faGithub} size="5x" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
