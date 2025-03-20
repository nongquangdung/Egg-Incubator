import React, { useState } from 'react';
import { CheckSquare, Square, Trash2, AlertTriangle } from 'lucide-react';
import { useIncubator } from '../contexts/IncubatorContext';

interface TaskListProps {
  compact?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ compact = false }) => {
  const { tasks, updateTask, deleteTask } = useIncubator();
  const [showCompleted, setShowCompleted] = useState(false);

  const filteredTasks = tasks.filter(task => showCompleted || !task.completed);
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Sort by completion status first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Priority Tasks</h3>
          <button 
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-xs text-blue-500 hover:underline"
          >
            {showCompleted ? 'Hide Completed' : 'Show Completed'}
          </button>
        </div>
        <ul className="space-y-2">
          {sortedTasks.slice(0, 3).map(task => (
            <li 
              key={task.id} 
              className={`flex items-center justify-between p-2 rounded ${task.completed ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
            >
              <div className="flex items-center">
                <button 
                  onClick={() => updateTask(task.id, { completed: !task.completed })}
                  className="mr-2"
                >
                  {task.completed ? 
                    <CheckSquare className="h-5 w-5 text-green-500" /> : 
                    <Square className="h-5 w-5 text-gray-400" />
                  }
                </button>
                <span className={task.completed ? 'line-through' : ''}>
                  {task.title}
                </span>
              </div>
              <AlertTriangle className={`h-4 w-4 ${getPriorityColor(task.priority)}`} />
            </li>
          ))}
        </ul>
        {sortedTasks.length > 3 && (
          <div className="mt-2 text-center text-sm text-gray-500">
            +{sortedTasks.length - 3} more tasks
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Monitoring Tasks</h2>
        <button 
          onClick={() => setShowCompleted(!showCompleted)}
          className="text-sm text-blue-500 hover:underline"
        >
          {showCompleted ? 'Hide Completed' : 'Show Completed'}
        </button>
      </div>
      
      {sortedTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <CheckSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p>No tasks available</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sortedTasks.map(task => (
            <li 
              key={task.id} 
              className={`flex items-start p-3 rounded border ${task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'}`}
            >
              <button 
                onClick={() => updateTask(task.id, { completed: !task.completed })}
                className="mt-0.5 mr-3 flex-shrink-0"
              >
                {task.completed ? 
                  <CheckSquare className="h-5 w-5 text-green-500" /> : 
                  <Square className="h-5 w-5 text-gray-400" />
                }
              </button>
              
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)} bg-opacity-10`}>
                      {task.priority}
                    </span>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {task.description && (
                  <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                    {task.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
