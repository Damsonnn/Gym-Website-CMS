import React, { useState } from 'react';
import SideMenu from './components/general/SideMenu';
import './assets/stylesheets/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pages from './components/general/Pages';
import LoginPage from './components/general/LoginPage';
import PasswordRecovey from './components/general/PasswordRecovery';
import PasswordRecovery from './components/general/PasswordRecovery';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginPage />}/>
          <Route path='manage/*' element={<Pages />} />
          <Route path='recovery' element={<PasswordRecovery />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
