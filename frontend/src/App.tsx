import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/page";
import Write from "./components/write/page";
import HomeIndex from "./components/home";
import DetailIndex from "./components/detail";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomeIndex />} />
          <Route path="/write" element={<Write />} />
          <Route path="/detail/:id" element={<DetailIndex />} />
        </Routes>
    </Router>
  );
}

export default App;
