import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'; // Login.js dosyasını içe aktar
import ForgotPassword from './components/ForgotPassword'; // ForgotPassword.js dosyasını içe aktar
import HighSchoolForm from './components/HighSchoolForm';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ana sayfa */}
        <Route path="/login" element={<Login />} /> {/* Login sayfası */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ForgotPassword sayfası */}
        <Route path="/highschool" element={<HighSchoolForm />} />
      </Routes>
    </Router>
  );
};

export default App;
