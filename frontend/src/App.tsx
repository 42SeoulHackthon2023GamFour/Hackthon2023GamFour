import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/page";
import ProductDetail from "./components/detail/page";
import Write from "./components/write/page";
import HomeIndex from "./components/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeIndex />} />
        <Route path="/write" element={<Write />}/>
        <Route path="/detail/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
