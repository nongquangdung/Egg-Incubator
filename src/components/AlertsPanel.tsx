import React from 'react';
import { AlertTriangle, Bell, BellOff } from 'lucide-react';
import { useIncubator } from '../contexts/IncubatorContext';

const AlertsPanel: React.FC = () => {
  const { currentData, settings, updateSettings } = useIncubator();
  
  const isTemperatureInRange = 
    currentData.temperature >= settings.idealTemperature.min && 
    currentData.temperature <= settings.idealTemperature.max;
    
  const isHumidityInRange = 
    currentData.humidity >= settings.idealHumidity.min && 
    currentData.humidity <= settings.idealHumidity.max;
  
  const hasAlerts = !isTemperatureInRange || !isHumidityInRange;
  
  const toggleAlerts = () => {
    updateSettings({ alertsEnabled: !settings.alertsEnabled });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Alerts</h2>
        <button 
          onClick={toggleAlerts}
          className={`p-2 rounded-full ${settings.alertsEnabled ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-500'}`}
        >
          {settings.alertsEnabled ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
        </button>
      </div>
      
      {!settings.alertsEnabled && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-gray-500 text-center">
          <BellOff className="h-6 w-6 mx-auto mb-2" />
          <p>Alerts are currently disabled</p>
        </div>
      )}
      
      {settings.alertsEnabled && !hasAlerts && (
        <div className="bg-green-50 p-4 rounded-lg text-green-700 text-center">
          <p className="font-medium">All parameters are within ideal ranges</p>
        </div>
      )}
      
      {settings.alertsEnabled && hasAlerts && (
        <div className="space-y-3">
          {!isTemperatureInRange && (
            <div className="bg-red-50 p-4 rounded-lg flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-700">Temperature Alert</h3>
                <p className="text-sm text-red-600 mt-1">
                  Current temperature ({currentData.temperature.toFixed(1)}°C) is 
                  {currentData.temperature < settings.idealTemperature.min ? ' below ' : ' above '} 
                  the ideal range ({settings.idealTemperature.min.toFixed(1)}-{settings.idealTemperature.max.toFixed(1)}°C)
                </p>
              </div>
            </div>
          )}
          
          {!isHumidityInRange && (
            <div className="bg-red-50 p-4 rounded-lg flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-700">Humidity Alert</h3>
                <p className="text-sm text-red-600 mt-1">
                  Current humidity ({currentData.humidity.toFixed(1)}%) is 
                  {currentData.humidity < settings.idealHumidity.min ? ' below ' : ' above '} 
                  the ideal range ({settings.idealHumidity.min.toFixed(0)}-{settings.idealHumidity.max.toFixed(0)}%)
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;
