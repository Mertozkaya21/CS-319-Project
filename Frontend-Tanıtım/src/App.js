import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'; // Login.js dosyasını içe aktar
import ForgotPassword from './components/ForgotPassword'; // ForgotPassword.js dosyasını içe aktar
import HighSchoolForm from './components/HighSchoolForm';
import CoordinatorDashboard from './components/CoordinatorDashboard/Dashboard';
import CoordinatorDashboardHighSchool from './components/CoordinatorDashboardHighSchool/DashboardHighSchool';
import CoordinatorDashboardAdvisors from './components/CoordinatorDashboardAdvisors/DashboardAdvisors';
import CoordinatorDashboardGuides from './components/CoordinatorDashboardGuides/DashboardGuides';
import CoordinatorDashboardTrainees from './components/CoordinatorDashboardTrainees/DashboardTrainees';
import CoordinatorDashboardTourApplications from './components/CoordinatorDashboardTourApplications/DashboardTourApplications';
import CoordinatorDashboardFairApplications from './components/CoordinatorDashboardFairApplications/DashboardFairApplications';
import CoordinatorDashboardToursAndFairs from './components/CoordinatorDashboardToursAndFairs/DashboardToursAndFairs';
import CoordinatorDashboardToursAndFairsViewAll from './components/CoordinatorDashboardToursAndFairsViewAll/DashboardToursAndFairsViewAll';
import CoordinatorDashboardFeedbackAnalysis from './components/CoordinatorDashboardFeedbackAnalysis/DashboardFeedbackAnalysis';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ana sayfa */}
        <Route path="/login" element={<Login />} /> {/* Login sayfası */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ForgotPassword sayfası */}
        <Route path="/highschool" element={<HighSchoolForm />} />
        <Route path="/coordinatordashboard" element={<CoordinatorDashboard />} />
        <Route path="/coordinatordashboardhighschool" element={<CoordinatorDashboardHighSchool />} />
        <Route path="/coordinatordashboardadvisors" element={<CoordinatorDashboardAdvisors />} />
        <Route path="/coordinatordashboardguides" element={<CoordinatorDashboardGuides />} />
        <Route path="/coordinatordashboardtrainees" element={<CoordinatorDashboardTrainees />} />
        <Route path="/coordinatordashboardtourapplications" element={<CoordinatorDashboardTourApplications />} />
        <Route path="/coordinatordashboardfairapplications" element={<CoordinatorDashboardFairApplications />} />
        <Route path="/coordinatordashboardtoursandfairs" element={<CoordinatorDashboardToursAndFairs />} />
        <Route path="/coordinatordashboardtoursandfairsviewall" element={<CoordinatorDashboardToursAndFairsViewAll />} />
        <Route path="/coordinatordashboardfeedbackanalysis" element={<CoordinatorDashboardFeedbackAnalysis />} />
        </Routes>
    </Router>
  );
};

export default App;
