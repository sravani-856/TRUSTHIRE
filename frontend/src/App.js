import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ResumeUpload from "./pages/ResumeUpload";
import ApplicationTracking from "./pages/ApplicationTracking";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PostJob from "./pages/PostJob";
import ProtectedRoute from "./components/ProtectedRoute";
import OTPVerify from "./pages/OTPVerify";
function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/otp-verify" element={<OTPVerify />} />

  {/* Jobseeker Routes */}
  <Route
    path="/jobs"
    element={
      <ProtectedRoute allowedRoles={["jobseeker"]}>
        <Jobs />
      </ProtectedRoute>
    }
  />

  <Route
    path="/job-details/:id"
    element={
      <ProtectedRoute allowedRoles={["jobseeker"]}>
        <JobDetails />
      </ProtectedRoute>
    }
  />

  <Route
    path="/resume-upload"
    element={
      <ProtectedRoute allowedRoles={["jobseeker"]}>
        <ResumeUpload />
      </ProtectedRoute>
    }
  />

  <Route
    path="/applications"
    element={
      <ProtectedRoute allowedRoles={["jobseeker"]}>
        <ApplicationTracking />
      </ProtectedRoute>
    }
  />

  {/* Recruiter Routes */}
  <Route
    path="/recruiter-dashboard"
    element={
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <RecruiterDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/post-job"
    element={
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <PostJob />
      </ProtectedRoute>
    }
  />

  {/* Admin Routes */}
  <Route
    path="/admin-dashboard"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />
</Routes>
    </BrowserRouter>
  );
}

export default App;