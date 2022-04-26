import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Table, Card, Container, Row, Col, Navbar, Nav } from "react-bootstrap";

import logo from "./logo.svg";
import "./App.css";
import StudentLoginPage from "./components/StudentLoginPage";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Router>
        <Routes>
          <Route path={"/login"} element={<StudentLoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
