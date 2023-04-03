import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Dashboard from "./components/Dashboard";
import DishDetailsPage from "./components/DishDetailsPage";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/details/:dish_id" element={<DishDetailsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
