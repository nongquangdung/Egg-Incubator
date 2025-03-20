import React from 'react';
import Card from './Card';
import { Thermometer, Droplets } from 'lucide-react';
import { useIncubator } from '../contexts/IncubatorContext';

const TemperatureHumidityCard: React.FC = () => {
  const { temperature, humidity, settings } = useIncubator();

  return (
    <Card variant="light" className="p-5">
      <h3 className="font-medium mb-4">
        {settings.language === 'en' ? 'Current Conditions' : 'Điều kiện hiện tại'}
      </h3>
      
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <Thermometer className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500">
              {settings.language === 'en' ? 'Temperature' : 'Nhiệt độ'}
            </div>
            <div className="text-xl font-semibold">{temperature}°C</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <Droplets className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500">
              {settings.language === 'en' ? 'Humidity' : 'Độ ẩm'}
            </div>
            <div className="text-xl font-semibold">{humidity}%</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-3">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            {settings.language === 'en' ? 'Status' : 'Trạng thái'}
          </div>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm font-medium">
              {settings.language === 'en' ? 'Optimal' : 'Tối ưu'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TemperatureHumidityCard;
