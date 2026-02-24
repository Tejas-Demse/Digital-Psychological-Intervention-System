import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ProfileSettings } from './components/ProfileSettings';
import { AuthProvider, useAuth } from './context/AuthContext';

export type UserRole = 'student' | 'admin' | 'counselor' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

function AppRoutes() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">Loading...</div>;
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      <Route 
        path="/register" 
        element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} 
      />
      <Route 
        path="/dashboard" 
        element={
          !user ? <Navigate to="/" /> : 
          user.role === 'admin' ? <AdminDashboard user={user} onLogout={logout} /> : 
          <StudentDashboard user={user} onLogout={logout} />
        } 
      />
      <Route 
        path="/profile" 
        element={user ? <ProfileSettings /> : <Navigate to="/" />} 
      />
      {/* Placeholders for new components */}
      <Route path="/assessments" element={<div>Assessments Component Here</div>} />
      <Route path="/chat" element={<div>Chat Component Here</div>} />
      <Route path="/resources" element={<div>Resources Component Here</div>} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
