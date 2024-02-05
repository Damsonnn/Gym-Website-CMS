import './assets/stylesheets/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pages from './components/general/Pages';
import LoginPage from './components/general/LoginPage';
import PasswordRecovery from './components/general/PasswordRecovery';
import Homepage from './components-homepage/GymSite';
import GymSite from './components-homepage/GymSite';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<GymSite />}/>
          <Route path='login' element={<LoginPage />}/>
          <Route path='manage/*' element={<Pages />} />
          <Route path='recovery' element={<PasswordRecovery />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
