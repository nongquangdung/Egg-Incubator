import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { Home, User, Bed, Car, Sun, Plus } from 'lucide-react';
import { useIncubator } from '../contexts/IncubatorContext';

const FocusMode: React.FC = () => {
  const { settings } = useIncubator();
  
  const [routines, setRoutines] = useState({
    household: [
      { 
        id: 1, 
        name: settings.language === 'en' ? 'Away' : 'Vắng nhà', 
        description: settings.language === 'en' ? "When everyone's away" : "Khi mọi người vắng nhà", 
        icon: <Home /> 
      },
      { 
        id: 2, 
        name: settings.language === 'en' ? 'Home' : 'Ở nhà', 
        description: settings.language === 'en' ? 'When someone comes home' : 'Khi có người về nhà', 
        icon: <Home /> 
      }
    ],
    personal: [
      { 
        id: 3, 
        name: settings.language === 'en' ? 'Bedtime' : 'Giờ đi ngủ', 
        description: settings.language === 'en' ? '1 starter • 3 actions' : '1 bộ khởi động • 3 hành động', 
        icon: <Bed /> 
      },
      { 
        id: 4, 
        name: settings.language === 'en' ? 'Commuting home' : 'Đi về nhà', 
        description: settings.language === 'en' ? '1 starter • 2 actions' : '1 bộ khởi động • 2 hành động', 
        icon: <Car /> 
      },
      { 
        id: 5, 
        name: settings.language === 'en' ? 'Commuting to work' : 'Đi làm', 
        description: settings.language === 'en' ? '1 starter • 4 actions' : '1 bộ khởi động • 4 hành động', 
        icon: <Car /> 
      },
      { 
        id: 6, 
        name: settings.language === 'en' ? 'Good morning' : 'Buổi sáng tốt lành', 
        description: settings.language === 'en' ? '1 starter • 2 actions' : '1 bộ khởi động • 2 hành động', 
        icon: <Sun /> 
      }
    ]
  });

  return (
    <div className="mobile-container pb-20">
      <Header title={settings.language === 'en' ? 'Automations' : 'Tự động hóa'} />
      
      <div className="p-4">
        <h2 className="text-lg font-medium mb-3">
          {settings.language === 'en' ? 'Household Routines' : 'Thói quen hộ gia đình'}
        </h2>
        
        {routines.household.length > 0 ? (
          <div className="space-y-3 mb-6">
            {routines.household.map(routine => (
              <Card key={routine.id} variant="light" className="flex items-center">
                <div className="mr-3">
                  {routine.icon}
                </div>
                <div>
                  <h3 className="font-medium">{routine.name}</h3>
                  <p className="text-sm text-gray-500">{routine.description}</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card variant="light" className="mb-6 text-center py-6">
            <p className="text-gray-500 mb-4">
              {settings.language === 'en' 
                ? 'Create a home to add household routines' 
                : 'Tạo một ngôi nhà để thêm thói quen hộ gia đình'}
            </p>
            <Button 
              variant="secondary" 
              icon={<Plus className="h-5 w-5" />}
            >
              {settings.language === 'en' ? 'Create home' : 'Tạo nhà'}
            </Button>
          </Card>
        )}
        
        <h2 className="text-lg font-medium mb-3">
          {settings.language === 'en' ? 'Personal Routines' : 'Thói quen cá nhân'}
        </h2>
        
        <div className="space-y-3 mb-6">
          {routines.personal.map(routine => (
            <Card key={routine.id} variant="light" className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  {routine.icon}
                </div>
                <div>
                  <h3 className="font-medium">{routine.name}</h3>
                  <p className="text-sm text-gray-500">{routine.description}</p>
                </div>
              </div>
              <div className="bg-white rounded-full p-2 shadow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="fixed bottom-20 right-4">
          <Button 
            variant="primary" 
            className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <Navbar />
    </div>
  );
};

export default FocusMode;
