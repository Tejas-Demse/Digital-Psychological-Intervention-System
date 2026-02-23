import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';

export type UserRole = 'student' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/dashboard" 
          element={
            !user ? <Navigate to="/" /> : 
            user.role === 'admin' ? <AdminDashboard user={user} onLogout={handleLogout} /> : 
            <StudentDashboard user={user} onLogout={handleLogout} />
          } 
        />
        {/* Placeholders for new components */}
        <Route path="/assessments" element={<div>Assessments Component Here</div>} />
        <Route path="/chat" element={<div>Chat Component Here</div>} />
        <Route path="/resources" element={<div>Resources Component Here</div>} />
      </Routes>
    </Router>
  );
}
