import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";

import Index from "./pages/index.jsx";
import Report from "./pages/report.jsx";
import Report_A from "./pages/report_a.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route
        path="/"
        element={<Report />}
      />
      <Route
        path="/andres"
        element={<Report_A />}
      />
      {/* <Route path="/report/:city/:state/:country" element={<Report />} /> */}
    </Routes>
  </Router>
);
