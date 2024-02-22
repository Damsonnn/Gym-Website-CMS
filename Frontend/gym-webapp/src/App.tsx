import './assets/stylesheets/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pages from './admin-panel/general/Pages';
import LoginPage from './admin-panel/general/LoginPage';
import PasswordRecovery from './admin-panel/general/PasswordRecovery';
import Homepage from './main-page/GymSite';
import GymSite from './main-page/GymSite';
import PasswordRecoveryNewPassword from './admin-panel/general/PasswordRecoveryNewPassword';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<GymSite />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='manage/*' element={<Pages />} />
                    <Route path='recovery' element={<PasswordRecovery />} />
                    <Route path='recovery/:token' element={<PasswordRecoveryNewPassword />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
