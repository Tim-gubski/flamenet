import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import flamenetLogo from "./flamenet-logo-white.png";
import okanaganNodeMap from "./nodemaps/okanagan-nodemap.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/fontawesome-free-brands";
import ImageMapper from "react-img-mapper";
import { Row, Col, Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const green = "#3dfc03";

const defaultNodes = [
  {
    name: "Okanagan 1",
    shape: "circle",
    coords: [205, 80, 8],
    preFillColor: green,
  },
  {
    name: "Okanagan 1",
    shape: "circle",
    coords: [205, 120, 8],
    preFillColor: green,
  },
  {
    name: "Browne Lake",
    shape: "circle",
    coords: [369, 220, 8],
    preFillColor: green,
  },
  {
    name: "Okanagan 1",
    shape: "circle",
    coords: [190, 250, 8],
    preFillColor: green,
  },
  {
    name: "Okanagan 1",
    shape: "circle",
    coords: [190, 250, 8],
    preFillColor: green,
  },
  {
    name: "Okanagan 1",
    shape: "circle",
    coords: [230, 390, 8],
    preFillColor: green,
  },
  {
    name: "Okanagan 1",
    shape: "circle",
    coords: [430, 290, 8],
    preFillColor: green,
  },
];

const Dashboard = () => {
  const db = getDatabase();
  const starCountRef = ref(db, "nodes");

  let [nodeData, setNodeData] = useState([]);

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setNodeData({ ...data });
      console.log(data);
    });
  }, []);
  const MAP = {
    name: "my-map",
    // GET JSON FROM BELOW URL AS AN EXAMPLE
    areas: [
      {
        name: "node1",
        shape: "circle",
        coords: [105, 80, 8],
        preFillColor:
          nodeData["node1"]?.status == "on fire" ? "#fc0303" : green,
      },
      {
        name: "node2",
        shape: "circle",
        coords: [190, 50, 8],
        preFillColor:
          nodeData["node2"]?.status == "on fire" ? "#fc0303" : green,
      },
      {
        name: "node3",
        shape: "circle",
        coords: [280, 25, 8],
        preFillColor:
          nodeData["node3"]?.status == "on fire" ? "#fc0303" : green,
      },
      ...defaultNodes,
    ],
  };

  let navigate = useNavigate(); 
  const home = () =>{ 
    let path = `/home`; 
    navigate(path);
  }

  return (
    <Container>
      <center>
        <br />
        <img className="logo" src={flamenetLogo} alt="FlameNet" />
        <br />
        <br />
        <h1>Okanagan Nodemap:</h1>
        <br />
        <br />
        <Row>
          <Col xs={6}>
            <ImageMapper src={okanaganNodeMap} map={MAP} width={500} />
          </Col>
          <Col xs={6} className="align-items-center">
            <Table id="rcorners1" responsive>
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
                        nodeData[key]?.status.toLowerCase() == "on fire"
                          ? "fire"
                          : nodeData[key]?.status.toLowerCase() == "not on fire"
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
                {defaultNodes.map((i, index) => {
                  return (
                    <tr className="no-fire">
                      <td>node{index + 3}</td>
                      <td>{i.coords.slice(0, 2).join(", ")}</td>
                      <td>Not On Fire</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>

        <br />
        <br />
        <div>
          <button class="button-30" onClick={home}>Back to Home</button>
          <a class="button-30" href="https://github.com/Tim-gubski/flamenet">View on Github</a>
        </div>
      </center>
      <br />
      <br />
    </Container>
  );
};

export default Dashboard;
