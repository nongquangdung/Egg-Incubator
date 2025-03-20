import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import IncubatorChart from '../components/IncubatorChart';
import { useIncubator } from '../contexts/IncubatorContext';
import { CheckCircle, XCircle, Clock, Target, ArrowRight } from 'lucide-react';

const SessionSummary: React.FC = () => {
  const navigate = useNavigate();
  const { focusModeParams, currentData, settings } = useIncubator();
  
  const isTemperatureInRange = 
    currentData.temperature >= settings.idealTemperature.min && 
    currentData.temperature <= settings.idealTemperature.max;
    
  const isHumidityInRange = 
    currentData.humidity >= settings.idealHumidity.min && 
    currentData.humidity <= settings.idealHumidity.max;
  
  // Mock data for session summary
  const sessionData = {
    duration: focusModeParams?.duration || 30,
    parameters: focusModeParams?.parameters || ['temperature', 'humidity'],
    startTime: focusModeParams?.startTime || new Date(Date.now() - 30 * 60 * 1000),
    endTime: new Date(),
    temperatureStability: Math.random() > 0.3 ? 'stable' : 'fluctuating',
    humidityStability: Math.random() > 0.3 ? 'stable' : 'fluctuating',
    alerts: Math.floor(Math.random() * 3),
  };
  
  const handleNewSession = () => {
    navigate('/focus-mode');
  };
  
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="ml-64 p-8">
        <div className="flex items-center mb-8">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Session Summary</h1>
            <p className="text-gray-600">Review your monitoring session results</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold">Focus Session Completed</h2>
            <p className="text-gray-600 mt-1">
              {sessionData.startTime.toLocaleTimeString()} - {sessionData.endTime.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
              <Clock className="h-8 w-8 text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-blue-700">{sessionData.duration} min</div>
              <div className="text-sm text-blue-600">Session Duration</div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
              <Target className="h-8 w-8 text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-blue-700">{sessionData.parameters.length}</div>
              <div className="text-sm text-blue-600">Parameters Monitored</div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
              <XCircle className="h-8 w-8 text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-blue-700">{sessionData.alerts}</div>
              <div className="text-sm text-blue-600">Alerts Triggered</div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Parameter Stability</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sessionData.parameters.includes('temperature') && (
                <div className={`p-5 rounded-lg border ${
                  sessionData.temperatureStability === 'stable' ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Temperature</h4>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sessionData.temperatureStability === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {sessionData.temperatureStability === 'stable' ? 'Stable' : 'Fluctuating'}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-2 h-10 rounded-full mr-3 ${
                      isTemperatureInRange ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="text-lg font-semibold">{currentData.temperature.toFixed(1)}°C</div>
                      <div className="text-sm text-gray-500">
                        Target: {settings.idealTemperature.min.toFixed(1)}-{settings.idealTemperature.max.toFixed(1)}°C
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {sessionData.parameters.includes('humidity') && (
                <div className={`p-5 rounded-lg border ${
                  sessionData.humidityStability === 'stable' ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Humidity</h4>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sessionData.humidityStability === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {sessionData.humidityStability === 'stable' ? 'Stable' : 'Fluctuating'}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-2 h-10 rounded-full mr-3 ${
                      isHumidityInRange ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="text-lg font-semibold">{currentData.humidity.toFixed(1)}%</div>
                      <div className="text-sm text-gray-500">
                        Target: {settings.idealHumidity.min.toFixed(0)}-{settings.idealHumidity.max.toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Session Data</h3>
            <IncubatorChart timeframe="minute" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleNewSession}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <Target className="h-5 w-5 mr-2" />
              Start New Session
            </button>
            <button
              onClick={handleBackToDashboard}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
          <h3 className="font-medium text-blue-800 mb-2">Recommendations</h3>
          <ul className="space-y-2 text-blue-700">
            {!isTemperatureInRange && (
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 mr-2 flex-shrink-0 mt-0.5">!</div>
                <span>
                  Consider {currentData.temperature < settings.idealTemperature.min ? 'increasing' : 'decreasing'} the temperature to bring it within the ideal range.
                </span>
              </li>
            )}
            {!isHumidityInRange && (
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 mr-2 flex-shrink-0 mt-0.5">!</div>
                <span>
                  {currentData.humidity < settings.idealHumidity.min ? 'Add water to the reservoir to increase humidity.' : 'Reduce humidity by improving ventilation.'}
                </span>
              </li>
            )}
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 mr-2 flex-shrink-0 mt-0.5">✓</div>
              <span>Schedule regular monitoring sessions to maintain optimal conditions.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SessionSummary;
