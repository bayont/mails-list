import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MailList from "./MailList";
import MailDetails from "./MailDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MailList />}></Route>
        <Route path="/mails/:mailId" element={<MailDetails />} />
      </Routes>
    </div>
  );
}

export default App;
