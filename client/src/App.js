import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import PaymentPage from './pages/PaymentPage';
import PaymentCallbackPage from './pages/PaymentCallbackPage';
import CreatePackagePage from './pages/CreatePackagePage';
import TrackingPage from './pages/TrackingPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import PaymentManagementPage from  './pages/admin/PaymentManagementPage';
import PackageManagementPage from './pages/admin/PackageManagementPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/track" element={<TrackingPage />} />
          <Route path="/track/:trackingCode" element={<TrackingPage />} />
          <Route path="/payment/callback" element={<PaymentCallbackPage />} />

          {/* Protected User Routes */}
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
          <Route path="/create-package" element={<PrivateRoute><CreatePackagePage /></PrivateRoute>} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="payments" element={<PaymentManagementPage />} />
            <Route path="packages" element={<PackageManagementPage />} />
          </Route>

        </Routes>
      </main>
    </Router>
  );
}

export default App;
