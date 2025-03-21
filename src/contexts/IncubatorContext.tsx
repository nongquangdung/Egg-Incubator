import React, { createContext, useState, useContext } from 'react';

interface IncubatorSettings {
  targetTemperature: number;
  eggTrayEnabled: boolean;
  eggRotationTime: number;
  alarmEnabled: boolean;
  language: 'en' | 'vi';
}

interface IncubatorContextType {
  settings: IncubatorSettings;
  updateSettings: (newSettings: Partial<IncubatorSettings>) => void;
}

const defaultSettings: IncubatorSettings = {
  targetTemperature: 37.5,
  eggTrayEnabled: true,
  eggRotationTime: 60,
  alarmEnabled: true,
  language: 'vi' // Set default language to Vietnamese
};

const IncubatorContext = createContext<IncubatorContextType | undefined>(undefined);

export function useIncubator() {
  const context = useContext(IncubatorContext);
  if (context === undefined) {
    throw new Error('useIncubator must be used within a IncubatorProvider');
  }
  return context;
}

export function IncubatorProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<IncubatorSettings>(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem('incubatorSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  const updateSettings = (newSettings: Partial<IncubatorSettings>) => {
    setSettings(prev => {
      const updatedSettings = { ...prev, ...newSettings };
      // Save to localStorage
      localStorage.setItem('incubatorSettings', JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  return (
    <IncubatorContext.Provider value={{ settings, updateSettings }}>
      {children}
    </IncubatorContext.Provider>
  );
}
