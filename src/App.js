import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoute from './components/routes/publicRoute.jsx';
import ProtectedRoute from './components/routes/protectedRoute.jsx';

import {RegisterPage} from './pages/register/register.jsx';
import LoginPage from './pages/login/login.jsx';
import { HomePage } from './pages/homepage/homepage.jsx';
import ProfilePage from './pages/profilePage/profilePage.jsx';

const App=()=>{
  
return(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>}/>
      <Route path="/register" element={<PublicRoute><RegisterPage/></PublicRoute>}/>
      <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
      <Route path="/" element={<PublicRoute><RegisterPage/></PublicRoute>}/>
      <Route path="/profile/:username" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>  
    </Routes>  
  </BrowserRouter>
  );
}

export default App;