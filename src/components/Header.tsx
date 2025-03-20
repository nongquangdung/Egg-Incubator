import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useIncubator } from '../contexts/IncubatorContext';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const { settings } = useIncubator();
  
  const getTitle = () => {
    if (title) return title;
    
    if (location.pathname === '/dashboard') {
      return settings.language === 'en' ? 'Home' : 'Trang chủ';
    } else if (location.pathname.includes('/monitoring')) {
      return settings.language === 'en' ? 'Monitoring' : 'Giám sát';
    } else if (location.pathname === '/focus-mode') {
      return settings.language === 'en' ? 'Automations' : 'Tự động hóa';
    } else if (location.pathname === '/tasks') {
      return settings.language === 'en' ? 'Tasks' : 'Nhiệm vụ';
    } else if (location.pathname === '/settings') {
      return settings.language === 'en' ? 'Settings' : 'Cài đặt';
    }
    
    return 'Incubator';
  };
  
  const firstLetter = currentUser?.name ? currentUser.name[0].toUpperCase() : 'U';

  return (
    <div className="header-bar">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">{getTitle()}</h1>
        {location.pathname === '/dashboard' && (
          <ChevronDown className="h-6 w-6 ml-1" />
        )}
      </div>
      <div className="flex items-center">
        <Bell className="h-6 w-6 mr-4 text-gray-600" />
        <div className="avatar">
          {firstLetter}
        </div>
      </div>
    </div>
  );
};

export default Header;
