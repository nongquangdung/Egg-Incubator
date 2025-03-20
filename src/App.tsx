import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './pages/WelcomeScreen';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import MonitoringView from './pages/MonitoringView';
import FocusMode from './pages/FocusMode';
import TaskManagement from './pages/TaskManagement';
import SessionSummary from './pages/SessionSummary';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { IncubatorProvider } from './contexts/IncubatorContext';
import { ChevronRight } from 'lucide-react';

// Make ChevronRight available globally for components
window.ChevronRight = ChevronRight;

function App() {
  return (
    <Router>
      <AuthProvider>
        <IncubatorProvider>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/monitoring/:timeframe" element={
              <ProtectedRoute>
                <MonitoringView />
              </ProtectedRoute>
            } />
            <Route path="/focus-mode" element={
              <ProtectedRoute>
                <FocusMode />
              </ProtectedRoute>
            } />
            <Route path="/tasks" element={
              <ProtectedRoute>
                <TaskManagement />
              </ProtectedRoute>
            } />
            <Route path="/session-summary" element={
              <ProtectedRoute>
                <SessionSummary />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Routes>
        </IncubatorProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
