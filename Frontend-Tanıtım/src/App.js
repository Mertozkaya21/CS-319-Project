import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'; // Login.js dosyasını içe aktar
import ForgotPassword from './components/ForgotPassword'; // ForgotPassword.js dosyasını içe aktar
import HighSchoolForm from './components/HighSchoolForm';
import CoordinatorDashboard from './components/CoordinatorDashboard/CoordinatorDashboard/Dashboard';
import CoordinatorDashboardHighSchool from './components/CoordinatorDashboard/CoordinatorDashboardHighSchool/DashboardHighSchool';
import CoordinatorDashboardAdvisors from './components/CoordinatorDashboard/CoordinatorDashboardAdvisors/DashboardAdvisors';
import CoordinatorDashboardGuides from './components/CoordinatorDashboard/CoordinatorDashboardGuides/DashboardGuides';
import CoordinatorDashboardTrainees from './components/CoordinatorDashboard/CoordinatorDashboardTrainees/DashboardTrainees';
import CoordinatorDashboardTourApplications from './components/CoordinatorDashboard/CoordinatorDashboardTourApplications/DashboardTourApplications';
import CoordinatorDashboardFairApplications from './components/CoordinatorDashboard/CoordinatorDashboardFairApplications/DashboardFairApplications';
import CoordinatorDashboardToursAndFairs from './components/CoordinatorDashboard/CoordinatorDashboardToursAndFairs/DashboardToursAndFairs';
import CoordinatorDashboardToursAndFairsViewAll from './components/CoordinatorDashboard/CoordinatorDashboardToursAndFairsViewAll/DashboardToursAndFairsViewAll';
import CoordinatorDashboardFeedbackAnalysis from './components/CoordinatorDashboard/CoordinatorDashboardFeedbackAnalysis/DashboardFeedbackAnalysis';
import CoordinatorDashboardProfile from './components/CoordinatorDashboard/CoordinatorDashboardProfile/DashboardProfile';
import CoordinatorDashboardSettings from './components/CoordinatorDashboard/CoordinatorDashboardSettings/DashboardSettings';
import CoordinatorDashboardChat from './components/CoordinatorDashboard/CoordinatorDashboardChat/DashboardChat';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/coordinatordashboardprofile" element={<CoordinatorDashboardProfile />} />
        <Route path="/coordinatordashboardsettings" element={<CoordinatorDashboardSettings />} />
        <Route path="/coordinatordashboardchat" element={<CoordinatorDashboardChat />} />

        </Routes>
    </Router>
  );
};

export default App;
