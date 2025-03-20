import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import IncubatorChart from '../components/IncubatorChart';
import { Thermometer, Droplets } from 'lucide-react';
import { useIncubator } from '../contexts/IncubatorContext';

const MonitoringView: React.FC = () => {
  const { timeframe } = useParams<{ timeframe: string }>();
  const { temperature, humidity, settings } = useIncubator();
  
  const getTimeframeTitle = () => {
    switch (timeframe) {
      case 'minute':
        return settings.language === 'en' ? 'Minute View' : 'Xem theo phút';
      case 'hour':
        return settings.language === 'en' ? 'Hour View' : 'Xem theo giờ';
      case 'day':
        return settings.language === 'en' ? 'Day View' : 'Xem theo ngày';
      default:
        return settings.language === 'en' ? 'Monitoring' : 'Giám sát';
    }
  };

  return (
    <div className="mobile-container pb-20">
      <Header title={getTimeframeTitle()} />
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="flex flex-col items-center justify-center p-6">
            <Thermometer className="h-8 w-8 text-red-500 mb-2" />
            <div className="text-2xl font-bold">{temperature}°C</div>
            <div className="text-sm text-gray-500">
              {settings.language === 'en' ? 'Temperature' : 'Nhiệt độ'}
            </div>
          </Card>
          
          <Card className="flex flex-col items-center justify-center p-6">
            <Droplets className="h-8 w-8 text-blue-500 mb-2" />
            <div className="text-2xl font-bold">{humidity}%</div>
            <div className="text-sm text-gray-500">
              {settings.language === 'en' ? 'Humidity' : 'Độ ẩm'}
            </div>
          </Card>
        </div>
        
        <Card variant="light" className="mb-6">
          <h3 className="font-medium mb-4">
            {settings.language === 'en' ? 'Temperature Trend' : 'Xu hướng nhiệt độ'}
          </h3>
          <IncubatorChart timeframe={timeframe || 'hour'} dataType="temperature" />
        </Card>
        
        <Card variant="light">
          <h3 className="font-medium mb-4">
            {settings.language === 'en' ? 'Humidity Trend' : 'Xu hướng độ ẩm'}
          </h3>
          <IncubatorChart timeframe={timeframe || 'hour'} dataType="humidity" />
        </Card>
      </div>
      
      <Navbar />
    </div>
  );
};

export default MonitoringView;
