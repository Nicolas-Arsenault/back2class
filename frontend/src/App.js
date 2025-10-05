import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Auth/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/Auth/VerifyEmailPage";
import ProtectedRoute from "./components/Security/ProtectedRoute";
import DashboardPage from "./pages/App/DashboardPage";
import AuthRedirectRoute from "./components/Security/AuthRedirectRoute";
import ComptePage from "./pages/App/ComptePage";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={
          <AuthRedirectRoute>
            <LandingPage />
          </AuthRedirectRoute>} />
        <Route path="/login" element={
          <AuthRedirectRoute>
            <LoginPage />
          </AuthRedirectRoute>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
        <Route path="/verify-email" element={<VerifyEmailPage/>}/>
        <Route path="/dashboard"
        element={<ProtectedRoute>
          <DashboardPage/>
        </ProtectedRoute>}/>
        <Route path="/compte"
        element={<ProtectedRoute>
          <ComptePage></ComptePage>
        </ProtectedRoute>}/>
      </Routes>
    </Router>
  )
}

export default App;