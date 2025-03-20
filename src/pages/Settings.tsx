import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  ChevronRight, 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  Info, 
  LogOut,
  Thermometer,
  RotateCw,
  Volume2,
  Globe,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useIncubator } from '../contexts/IncubatorContext';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { logout, currentUser } = useAuth();
  const { settings, updateSettings } = useIncubator();
  const navigate = useNavigate();
  
  const [showTemperatureModal, setShowTemperatureModal] = useState(false);
  const [tempValue, setTempValue] = useState(settings.targetTemperature);
  
  const [showRotationModal, setShowRotationModal] = useState(false);
  const [rotationTime, setRotationTime] = useState(settings.eggRotationTime);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleEggTray = () => {
    updateSettings({ eggTrayEnabled: !settings.eggTrayEnabled });
  };

  const toggleAlarm = () => {
    updateSettings({ alarmEnabled: !settings.alarmEnabled });
  };

  const toggleLanguage = () => {
    updateSettings({ language: settings.language === 'en' ? 'vi' : 'en' });
  };

  const saveTemperature = () => {
    updateSettings({ targetTemperature: tempValue });
    setShowTemperatureModal(false);
  };

  const saveRotationTime = () => {
    updateSettings({ eggRotationTime: rotationTime });
    setShowRotationModal(false);
  };

  const getLanguageText = () => {
    return settings.language === 'en' ? 'English' : 'Tiếng Việt';
  };

  const settingsSections = [
    {
      title: settings.language === 'en' ? 'Account' : 'Tài khoản',
      items: [
        { 
          icon: <User className="h-5 w-5" />, 
          label: settings.language === 'en' ? 'Profile' : 'Hồ sơ', 
          action: () => {} 
        },
        { 
          icon: <Bell className="h-5 w-5" />, 
          label: settings.language === 'en' ? 'Notifications' : 'Thông báo', 
          action: () => {} 
        },
        { 
          icon: <Shield className="h-5 w-5" />, 
          label: settings.language === 'en' ? 'Privacy & Security' : 'Quyền riêng tư & Bảo mật', 
          action: () => {} 
        }
      ]
    },
    {
      title: settings.language === 'en' ? 'Incubator Settings' : 'Cài đặt máy ấp',
      items: [
        { 
          icon: <Thermometer className="h-5 w-5 text-red-500" />, 
          label: settings.language === 'en' ? 'Temperature' : 'Nhiệt độ', 
          value: `${settings.targetTemperature}°C`,
          action: () => setShowTemperatureModal(true) 
        },
        { 
          icon: <RotateCw className="h-5 w-5 text-blue-500" />, 
          label: settings.language === 'en' ? 'Egg Tray' : 'Khay đảo trứng', 
          toggle: true,
          enabled: settings.eggTrayEnabled,
          action: toggleEggTray 
        },
        { 
          icon: <Clock className="h-5 w-5 text-purple-500" />, 
          label: settings.language === 'en' ? 'Rotation Time' : 'Thời gian đảo trứng', 
          value: `${settings.eggRotationTime} ${settings.language === 'en' ? 'seconds' : 'giây'}`,
          action: () => setShowRotationModal(true) 
        },
        { 
          icon: <Volume2 className="h-5 w-5 text-yellow-500" />, 
          label: settings.language === 'en' ? 'Alarm' : 'Còi cảnh báo', 
          toggle: true,
          enabled: settings.alarmEnabled,
          action: toggleAlarm 
        },
        { 
          icon: <Globe className="h-5 w-5 text-green-500" />, 
          label: settings.language === 'en' ? 'Language' : 'Ngôn ngữ', 
          value: getLanguageText(),
          action: toggleLanguage 
        }
      ]
    },
    {
      title: settings.language === 'en' ? 'Support' : 'Hỗ trợ',
      items: [
        { 
          icon: <HelpCircle className="h-5 w-5" />, 
          label: settings.language === 'en' ? 'Help Center' : 'Trung tâm trợ giúp', 
          action: () => {} 
        },
        { 
          icon: <Info className="h-5 w-5" />, 
          label: settings.language === 'en' ? 'About' : 'Thông tin', 
          action: () => {} 
        }
      ]
    }
  ];

  return (
    <div className="mobile-container pb-20">
      <Header title={settings.language === 'en' ? 'Settings' : 'Cài đặt'} />
      
      <div className="p-4">
        <Card className="flex items-center mb-6">
          <div className="avatar mr-4">
            {currentUser?.name ? currentUser.name[0].toUpperCase() : 'U'}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{currentUser?.name || 'User'}</h3>
            <p className="text-sm text-gray-500">{currentUser?.email || 'user@example.com'}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Card>
        
        {settingsSections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-medium mb-3">{section.title}</h2>
            <div className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <Card 
                  key={itemIndex} 
                  variant="light" 
                  className="flex items-center"
                  onClick={item.action}
                >
                  <div className="mr-3 text-gray-600">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.label}</h3>
                  </div>
                  {item.toggle ? (
                    item.enabled ? (
                      <ToggleRight className="h-6 w-6 text-blue-500" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-gray-400" />
                    )
                  ) : item.value ? (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">{item.value}</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
        
        <Card 
          variant="light" 
          className="flex items-center text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">{settings.language === 'en' ? 'Logout' : 'Đăng xuất'}</span>
        </Card>
        
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>Incubator App v1.0.0</p>
          <p className="mt-1">© 2023 Incubator Technologies</p>
        </div>
      </div>
      
      {/* Temperature Modal */}
      {showTemperatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <h3 className="text-lg font-medium mb-4">
              {settings.language === 'en' ? 'Set Temperature' : 'Cài đặt nhiệt độ'}
            </h3>
            
            <div className="mb-4">
              <input
                type="range"
                min="35"
                max="40"
                step="0.1"
                value={tempValue}
                onChange={(e) => setTempValue(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-2xl font-bold mt-2">
                {tempValue.toFixed(1)}°C
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowTemperatureModal(false)}
              >
                {settings.language === 'en' ? 'Cancel' : 'Hủy'}
              </Button>
              <Button 
                className="flex-1"
                onClick={saveTemperature}
              >
                {settings.language === 'en' ? 'Save' : 'Lưu'}
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      {/* Rotation Time Modal */}
      {showRotationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <h3 className="text-lg font-medium mb-4">
              {settings.language === 'en' ? 'Set Rotation Time' : 'Cài đặt thời gian đảo trứng'}
            </h3>
            
            <div className="mb-4">
              <input
                type="range"
                min="30"
                max="180"
                step="10"
                value={rotationTime}
                onChange={(e) => setRotationTime(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-2xl font-bold mt-2">
                {rotationTime} {settings.language === 'en' ? 'seconds' : 'giây'}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowRotationModal(false)}
              >
                {settings.language === 'en' ? 'Cancel' : 'Hủy'}
              </Button>
              <Button 
                className="flex-1"
                onClick={saveRotationTime}
              >
                {settings.language === 'en' ? 'Save' : 'Lưu'}
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      <Navbar />
    </div>
  );
};

export default Settings;
