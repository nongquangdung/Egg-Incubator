import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { Clock, CheckCircle, Circle, Plus } from 'lucide-react';
import { useIncubator } from '../contexts/IncubatorContext';

interface Task {
  id: number;
  title: string;
  titleVi: string;
  completed: boolean;
  dueDate?: string;
  dueDateVi?: string;
}

const TaskManagement: React.FC = () => {
  const { settings } = useIncubator();
  
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: 'Check incubator temperature', 
      titleVi: 'Kiểm tra nhiệt độ máy ấp',
      completed: true, 
      dueDate: '2 hours ago',
      dueDateVi: '2 giờ trước'
    },
    { 
      id: 2, 
      title: 'Refill water reservoir', 
      titleVi: 'Đổ đầy bình nước',
      completed: false, 
      dueDate: 'Today',
      dueDateVi: 'Hôm nay'
    },
    { 
      id: 3, 
      title: 'Clean incubator tray', 
      titleVi: 'Vệ sinh khay máy ấp',
      completed: false, 
      dueDate: 'Tomorrow',
      dueDateVi: 'Ngày mai'
    },
    { 
      id: 4, 
      title: 'Turn eggs', 
      titleVi: 'Đảo trứng',
      completed: false, 
      dueDate: 'In 3 hours',
      dueDateVi: 'Trong 3 giờ'
    }
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="mobile-container pb-20">
      <Header title={settings.language === 'en' ? 'Activity' : 'Hoạt động'} />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {settings.language === 'en' ? 'Recent Activity' : 'Hoạt động gần đây'}
          </h2>
          <Button variant="secondary" className="text-sm px-4 py-1">
            {settings.language === 'en' ? 'See all' : 'Xem tất cả'}
          </Button>
        </div>
        
        <Card variant="light" className="mb-6">
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-sm text-gray-500">
              {settings.language === 'en' ? 'Today, 9:41 AM' : 'Hôm nay, 9:41 SA'}
            </span>
          </div>
          <p>
            {settings.language === 'en' 
              ? 'Temperature reached optimal level (37.5°C)' 
              : 'Nhiệt độ đạt mức tối ưu (37.5°C)'}
          </p>
        </Card>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {settings.language === 'en' ? 'Tasks' : 'Nhiệm vụ'}
          </h2>
          <Button variant="secondary" className="text-sm px-4 py-1">
            {settings.language === 'en' ? 'See all' : 'Xem tất cả'}
          </Button>
        </div>
        
        <div className="space-y-3 mb-6">
          {tasks.map(task => (
            <Card key={task.id} variant="light" className="flex items-center">
              <button 
                onClick={() => toggleTask(task.id)}
                className="mr-3 text-blue-500"
              >
                {task.completed ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
              </button>
              <div className="flex-1">
                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {settings.language === 'en' ? task.title : task.titleVi}
                </h3>
                {task.dueDate && (
                  <p className="text-sm text-gray-500">
                    {settings.language === 'en' ? task.dueDate : task.dueDateVi}
                  </p>
                )}
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

export default TaskManagement;
