import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MentorProvider } from './context/MentorContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OTPPage from './pages/OTPPage';
import DashboardPage from './pages/DashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminOTPPage from './pages/AdminOTPPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import MentorLoginPage from './pages/MentorLoginPage';
import MentorSignupPage from './pages/MentorSignupPage';
import MentorOTPPage from './pages/MentorOTPPage';
import MentorDashboardPage from './pages/MentorDashboardPage';
import { Analytics } from '@vercel/analytics/react';



const App: React.FC = () => {
  return (
    <AuthProvider>
      <MentorProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* User Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-otp" element={<OTPPage />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/verify-otp" element={<AdminOTPPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            {/* Mentor Routes */}
            <Route path="/mentor/login" element={<MentorLoginPage />} />
            <Route path="/mentor/signup" element={<MentorSignupPage />} />
            <Route path="/mentor/verify-otp" element={<MentorOTPPage />} />
            <Route path="/mentor/dashboard" element={<MentorDashboardPage />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Analytics />
      </MentorProvider>
    </AuthProvider>
  );
};

export default App;