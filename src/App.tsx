import React from "react";
import logo from "./logo.svg";
import "material-icons/iconfont/material-icons.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MailList } from "./components/MailList/MailList";
import { MailDetails } from "./components/MailDetails/MailDetails";

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
