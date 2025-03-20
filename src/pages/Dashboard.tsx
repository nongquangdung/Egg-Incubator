import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import TemperatureHumidityCard from '../components/TemperatureHumidityCard';
import { Link } from 'react-router-dom';
import { 
  Thermometer, 
  Droplets, 
  Clock, 
  BarChart2, 
  Calendar, 
  Target,
  MoveHorizontal,
  Edit,
  Lightbulb
} from 'lucide-react';
import { useIncubator } from '../contexts/IncubatorContext';

const Dashboard: React.FC = () => {
  const { temperature, humidity, settings } = useIncubator();

  return (
    <div className="mobile-container pb-20">
      <Header />
      
      <div className="p-4">
        <Card variant="highlight" className="mb-6">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 rounded-full mr-4">
              <Thermometer className="h-6 w-6 text-amber-800" />
            </div>
            <div>
              <h3 className="font-medium">{settings.language === 'en' ? 'Incubator' : 'Máy ấp'}</h3>
              <p className="text-sm text-gray-500">
                {settings.language === 'en' ? '1 device' : '1 thiết bị'}
              </p>
            </div>
          </div>
        </Card>
        
        <h2 className="text-lg font-medium mb-3">
          {settings.language === 'en' ? 'Favorites' : 'Yêu thích'}
        </h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="flex items-center">
            <Lightbulb className="h-5 w-5 text-amber-500 mr-3" />
            <div>
              <div className="font-medium">
                {settings.language === 'en' ? 'Temperature' : 'Nhiệt độ'}
              </div>
              <div className="text-sm">
                <span className="text-amber-500">•</span> {temperature}°C
              </div>
            </div>
          </Card>
          
          <Card variant="light" className="flex items-center">
            <Droplets className="h-5 w-5 text-blue-500 mr-3" />
            <div>
              <div className="font-medium">
                {settings.language === 'en' ? 'Humidity' : 'Độ ẩm'}
              </div>
              <div className="text-sm">
                <span className="text-blue-500">•</span> {humidity}%
              </div>
            </div>
          </Card>
          
          <Card variant="light" className="flex items-center col-span-2">
            <Thermometer className="h-5 w-5 text-gray-500 mr-3" />
            <div className="flex-1">
              <div className="font-medium">
                {settings.language === 'en' ? 'Incubator Status' : 'Trạng thái máy ấp'}
              </div>
              <div className="text-sm text-gray-500">
                {settings.language === 'en' ? 'Active' : 'Đang hoạt động'}
              </div>
            </div>
            <div className="text-blue-500">
              <ChevronRight className="h-5 w-5" />
            </div>
          </Card>
        </div>
        
        <div className="flex justify-between mb-6">
          <Button 
            variant="outline" 
            icon={<MoveHorizontal className="h-5 w-5" />}
            className="flex-1 mr-2"
          >
            {settings.language === 'en' ? 'Reorder' : 'Sắp xếp lại'}
          </Button>
          <Button 
            variant="outline" 
            icon={<Edit className="h-5 w-5" />}
            className="flex-1 ml-2"
          >
            {settings.language === 'en' ? 'Edit' : 'Chỉnh sửa'}
          </Button>
        </div>
        
        <h2 className="text-lg font-medium mb-3">
          {settings.language === 'en' ? 'Monitoring Views' : 'Chế độ xem giám sát'}
        </h2>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          <Link to="/monitoring/minute">
            <Card variant="light" className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">
                  {settings.language === 'en' ? 'Minute View' : 'Xem theo phút'}
                </h3>
                <p className="text-sm text-gray-500">
                  {settings.language === 'en' ? 'Real-time updates' : 'Cập nhật thời gian thực'}
                </p>
              </div>
            </Card>
          </Link>
          
          <Link to="/monitoring/hour">
            <Card variant="light" className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <BarChart2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">
                  {settings.language === 'en' ? 'Hour View' : 'Xem theo giờ'}
                </h3>
                <p className="text-sm text-gray-500">
                  {settings.language === 'en' ? 'Hourly trends' : 'Xu hướng theo giờ'}
                </p>
              </div>
            </Card>
          </Link>
          
          <Link to="/monitoring/day">
            <Card variant="light" className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">
                  {settings.language === 'en' ? 'Day View' : 'Xem theo ngày'}
                </h3>
                <p className="text-sm text-gray-500">
                  {settings.language === 'en' ? 'Long-term patterns' : 'Mô hình dài hạn'}
                </p>
              </div>
            </Card>
          </Link>
        </div>
        
        <Link to="/focus-mode">
          <Button 
            fullWidth 
            icon={<Target className="h-5 w-5" />}
            className="mb-6"
          >
            {settings.language === 'en' ? 'Enter Focus Mode' : 'Vào chế độ tập trung'}
          </Button>
        </Link>
        
        <TemperatureHumidityCard />
      </div>
      
      <Navbar />
    </div>
  );
};

export default Dashboard;
