import 'material-icons/iconfont/material-icons.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { MailDetails } from './components/MailDetails/MailDetails';
import { MailList } from './components/MailList/MailList';
import logo from './logo.svg';

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<MailList />}>
               <Route path="/pages/:pageId" element={<MailList />}></Route>
            </Route>
            <Route path="/mails/:mailId" element={<MailDetails />} />
         </Routes>
      </div>
   );
}

export default App;
