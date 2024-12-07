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
import CoordinatorDashboardPayments from './components/CoordinatorDashboard/CoordinatorDashboardPayments/DashboardPayments';
import CoordinatorDashboardProfile from './components/CoordinatorDashboard/CoordinatorDashboardProfile/DashboardProfile';
import CoordinatorDashboardChat from './components/CoordinatorDashboard/CoordinatorDashboardChat/DashboardChat';
import CoordinatorDashboardSettings from './components/CoordinatorDashboard/CoordinatorDashboardSettings/DashboardSettings';
import CoordinatorDashboardNotifications from './components/CoordinatorDashboard/CoordinatorDashboardNotifications/DashboardNotifications';

import AdvisorDashboard from './components/AdvisorDashboard/AdvisorDashboard/Dashboard';
import AdvisorDashboardTourApplications from './components/AdvisorDashboard/AdvisorDashboardTourApplications/DashboardTourApplications';
import AdvisorDashboardTours from './components/AdvisorDashboard/AdvisorDashboardTours/DashboardTours';
import AdvisorDashboardFairs from './components/AdvisorDashboard/AdvisorDashboardFairs/DashboardFairs';
import AdvisorDashboardGuides from './components/AdvisorDashboard/AdvisorDashboardGuides/DashboardGuides';
import AdvisorDashboardTrainees from './components/AdvisorDashboard/AdvisorDashboardTrainees/DashboardTrainees';
import AdvisorDashboardPuantaj from './components/AdvisorDashboard/AdvisorDashboardPuantaj/DashboardPuantaj';
import AdvisorDashboardProfile from './components/AdvisorDashboard/AdvisorDashboardProfile/DashboardProfile';
import AdvisorDashboardChat from './components/AdvisorDashboard/AdvisorDashboardChat/DashboardChat';
import AdvisorDashboardSettings from './components/AdvisorDashboard/AdvisorDashboardSettings/DashboardSettings';
import AdvisorDashboardNotifications from './components/AdvisorDashboard/AdvisorDashboardNotifications/DashboardNotifications';

import GuideDashboard from './components/GuideDashboard/GuideDashboard/Dashboard';
import GuideDashboardTours from './components/GuideDashboard/GuideDashboardTours/DashboardTours';
import GuideDashboardFairs from './components/GuideDashboard/GuideDashboardFairs/DashboardFairs';
import GuideDashboardTrainees from './components/GuideDashboard/GuideDashboardTrainees/DashboardTrainees';
import GuideDashboardPuantaj from './components/GuideDashboard/GuideDashboardPuantaj/DashboardPuantaj';
import GuideDashboardProfile from './components/GuideDashboard/GuideDashboardProfile/DashboardProfile';
import GuideDashboardChat from './components/GuideDashboard/GuideDashboardChat/DashboardChat';
import GuideDashboardSettings from './components/GuideDashboard/GuideDashboardSettings/DashboardSettings';
import GuideDashboardNotifications from './components/GuideDashboard/GuideDashboardNotifications/DashboardNotifications';

import TraineeDashboard from './components/TraineeDashboard/TraineeDashboard/Dashboard';
import TraineeDashboardTours from './components/TraineeDashboard/TraineeDashboardTours/DashboardTours';
import TraineeDashboardPuantaj from './components/TraineeDashboard/TraineeDashboardPuantaj/DashboardPuantaj';
import TraineeDashboardProfile from './components/TraineeDashboard/TraineeDashboardProfile/DashboardProfile';
import TraineeDashboardChat from './components/TraineeDashboard/TraineeDashboardChat/DashboardChat';
import TraineeDashboardSettings from './components/TraineeDashboard/TraineeDashboardSettings/DashboardSettings';
import TraineeDashboardNotifications from './components/TraineeDashboard/TraineeDashboardNotifications/DashboardNotifications';

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
        <Route path="/coordinatordashboardpayments" element={<CoordinatorDashboardPayments />} />
        <Route path="/coordinatordashboardprofile" element={<CoordinatorDashboardProfile />} />
        <Route path="/coordinatordashboardchat" element={<CoordinatorDashboardChat />} />
        <Route path="/coordinatordashboardsettings" element={<CoordinatorDashboardSettings />} />
        <Route path="/coordinatordashboardnotifications" element={<CoordinatorDashboardNotifications />} />

        <Route path="/advisordashboard" element={<AdvisorDashboard />} />
        <Route path="/advisordashboardtourapplications" element={<AdvisorDashboardTourApplications />} />
        <Route path="/advisordashboardtours" element={<AdvisorDashboardTours />} />
        <Route path="/advisordashboardfairs" element={<AdvisorDashboardFairs />} />
        <Route path="/advisordashboardguides" element={<AdvisorDashboardGuides />} />
        <Route path="/advisordashboardtrainees" element={<AdvisorDashboardTrainees />} />
        <Route path="/advisordashboardpuantaj" element={<AdvisorDashboardPuantaj />} />
        <Route path="/advisordashboardprofile" element={<AdvisorDashboardProfile />} />
        <Route path="/advisordashboardchat" element={<AdvisorDashboardChat />} />
        <Route path="/advisordashboardsettings" element={<AdvisorDashboardSettings />} />
        <Route path="/advisordashboardnotifications" element={<AdvisorDashboardNotifications />} />

        <Route path="/guidedashboard" element={<GuideDashboard />} />
        <Route path="/guidedashboardtours" element={<GuideDashboardTours />} />
        <Route path="/guidedashboardfairs" element={<GuideDashboardFairs />} />
        <Route path="/guidedashboardtrainees" element={<GuideDashboardTrainees />} />
        <Route path="/guidedashboardpuantaj" element={<GuideDashboardPuantaj />} />
        <Route path="/guidedashboardprofile" element={<GuideDashboardProfile />} />
        <Route path="/guidedashboardchat" element={<GuideDashboardChat />} />
        <Route path="/guidedashboardsettings" element={<GuideDashboardSettings />} />
        <Route path="/guidedashboardnotifications" element={<GuideDashboardNotifications />} />

        <Route path="/traineedashboard" element={<TraineeDashboard />} />
        <Route path="/traineedashboardtours" element={<TraineeDashboardTours />} />
        <Route path="/traineedashboardpuantaj" element={<TraineeDashboardPuantaj />} />
        <Route path="/traineedashboardprofile" element={<TraineeDashboardProfile />} />
        <Route path="/traineedashboardchat" element={<TraineeDashboardChat />} />
        <Route path="/traineedashboardsettings" element={<TraineeDashboardSettings />} />
        <Route path="/traineedashboardnotifications" element={<TraineeDashboardNotifications />} />

        </Routes>
    </Router>
  );
};

export default App;
