import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Layers, 
  Sparkles, 
  Clock, 
  Settings as SettingsIcon
} from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    if (path === '/monitoring' && location.pathname.includes('/monitoring')) {
      return true;
    }
    if (path === '/focus-mode' && location.pathname === '/focus-mode') {
      return true;
    }
    if (path === '/tasks' && location.pathname === '/tasks') {
      return true;
    }
    if (path === '/settings' && location.pathname === '/settings') {
      return true;
    }
    return false;
  };

  return (
    <div className="bottom-nav">
      <Link to="/dashboard" className={`bottom-nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
        <Home className="h-6 w-6" />
        <span>Home</span>
      </Link>
      <Link to="/monitoring/minute" className={`bottom-nav-item ${isActive('/monitoring') ? 'active' : ''}`}>
        <Layers className="h-6 w-6" />
        <span>Devices</span>
      </Link>
      <Link to="/focus-mode" className={`bottom-nav-item ${isActive('/focus-mode') ? 'active' : ''}`}>
        <Sparkles className="h-6 w-6" />
        <span>Automations</span>
      </Link>
      <Link to="/tasks" className={`bottom-nav-item ${isActive('/tasks') ? 'active' : ''}`}>
        <Clock className="h-6 w-6" />
        <span>Activity</span>
      </Link>
      <Link to="/settings" className={`bottom-nav-item ${isActive('/settings') ? 'active' : ''}`}>
        <SettingsIcon className="h-6 w-6" />
        <span>Settings</span>
      </Link>
    </div>
  );
};

export default Navbar;
