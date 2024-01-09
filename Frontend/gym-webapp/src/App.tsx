import React, { useState } from 'react';
import SideMenu from './components/general/SideMenu';
import './assets/stylesheets/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pages from './components/general/Pages';
import LoginPage from './components/general/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginPage />}/>
          <Route path='manage/*' element={<Pages />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
