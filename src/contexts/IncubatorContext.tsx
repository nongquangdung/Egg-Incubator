import React, { createContext, useState, useContext, useEffect } from 'react';

interface IncubatorSettings {
  targetTemperature: number;
  eggTrayEnabled: boolean;
  eggRotationTime: number;
  alarmEnabled: boolean;
  language: 'en' | 'vi';
}

interface IncubatorContextType {
  temperature: number;
  humidity: number;
  settings: IncubatorSettings;
  setTemperature: (temp: number) => void;
  setHumidity: (hum: number) => void;
  updateSettings: (newSettings: Partial<IncubatorSettings>) => void;
  generateChartData: (timeframe: string) => {
    labels: string[];
    temperatureData: number[];
    humidityData: number[];
  };
}

const defaultSettings: IncubatorSettings = {
  targetTemperature: 37.5,
  eggTrayEnabled: true,
  eggRotationTime: 60,
  alarmEnabled: true,
  language: 'en'
};

const IncubatorContext = createContext<IncubatorContextType | undefined>(undefined);

export function useIncubator() {
  const context = useContext(IncubatorContext);
  if (context === undefined) {
    throw new Error('useIncubator must be used within an IncubatorProvider');
  }
  return context;
}

export function IncubatorProvider({ children }: { children: React.ReactNode }) {
  const [temperature, setTemperature] = useState(37.5);
  const [humidity, setHumidity] = useState(65);
  const [settings, setSettings] = useState<IncubatorSettings>(defaultSettings);
  
  // Simulate temperature and humidity fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prev => {
        const fluctuation = (Math.random() - 0.5) * 0.2;
        return parseFloat((prev + fluctuation).toFixed(1));
      });
      
      setHumidity(prev => {
        const fluctuation = (Math.random() - 0.5) * 0.5;
        return parseFloat((prev + fluctuation).toFixed(1));
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const updateSettings = (newSettings: Partial<IncubatorSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };
  
  const generateChartData = (timeframe: string) => {
    let labels: string[] = [];
    let dataPoints = 0;
    
    switch (timeframe) {
      case 'minute':
        dataPoints = 60;
        labels = Array.from({ length: dataPoints }, (_, i) => `${i}s`);
        break;
      case 'hour':
        dataPoints = 12;
        labels = Array.from({ length: dataPoints }, (_, i) => `${i * 5}m`);
        break;
      case 'day':
        dataPoints = 24;
        labels = Array.from({ length: dataPoints }, (_, i) => `${i}h`);
        break;
      default:
        dataPoints = 12;
        labels = Array.from({ length: dataPoints }, (_, i) => `${i * 5}m`);
    }
    
    // Generate realistic data with slight variations
    const temperatureData = Array.from({ length: dataPoints }, () => {
      return parseFloat((temperature + (Math.random() - 0.5) * 0.5).toFixed(1));
    });
    
    const humidityData = Array.from({ length: dataPoints }, () => {
      return parseFloat((humidity + (Math.random() - 0.5) * 2).toFixed(1));
    });
    
    return {
      labels,
      temperatureData,
      humidityData
    };
  };

  const value = {
    temperature,
    humidity,
    settings,
    setTemperature,
    setHumidity,
    updateSettings,
    generateChartData
  };

  return (
    <IncubatorContext.Provider value={value}>
      {children}
    </IncubatorContext.Provider>
  );
}
