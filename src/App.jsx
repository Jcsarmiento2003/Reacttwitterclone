import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dashboard from './Dashboard';
import Login from './Login';
import Navbar from './components/Navbar';
import Settings from './Settings.jsx';
function App() {
  return (
    <Router>
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Col>
      </Row>
    </Router>
  );
}

export default App;