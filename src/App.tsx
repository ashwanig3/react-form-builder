import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormBuilder from "./components/FormBuilder";
import FormRenderer from "./components/FormRenderer";
import "./output.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<FormBuilder />} />
        <Route path="/renderer" element={<FormRenderer />} />
      </Routes>
    </Router>
  );
};

export default App;
