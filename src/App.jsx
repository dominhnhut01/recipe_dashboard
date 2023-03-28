import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <h1>EXPLORING CUISINES</h1>
      <Dashboard
        number="20"
      />
    </div>
  );
}

export default App;
