import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

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

  return (
    <div className="App">
      <h1>FlameNet</h1>
      <table>
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
              <tr>
                <td>{key}</td>
                <td>{nodeData[key]?.location}</td>
                <td>{nodeData[key]?.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <header className="App-header">{JSON.stringify(nodeData)}</header>
    </div>
  );
}

export default App;
