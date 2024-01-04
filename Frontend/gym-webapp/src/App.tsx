import React, { useState } from 'react';
import SideMenu from './components/SideMenu';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Pages from './components/Pages';

function App() {
  const [showMenu, setShowMenu] = useState(false) 

  return (
    <div className="App">
      <header>
        <div className='hamburger' onClick={() => setShowMenu(!showMenu)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>
      <BrowserRouter>
        <div className='content'>
          {showMenu ? <SideMenu/> : null}
          <Pages/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
