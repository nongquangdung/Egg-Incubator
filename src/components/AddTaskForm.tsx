import React, { useState } from 'react';
import { useIncubator } from '../contexts/IncubatorContext';

const AddTaskForm: React.FC = () => {
  const { addTask } = useIncubator();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    addTask({
      title,
      description,
      priority,
      completed: false,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setIsFormOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {!isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center"
        >
          <span className="mr-2">+</span> Add New Task
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title*
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={priority === 'low'}
                  onChange={() => setPriority('low')}
                  className="h-4 w-4 text-green-500 focus:ring-green-400"
                />
                <span className="ml-2 text-sm text-gray-700">Low</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={priority === 'medium'}
                  onChange={() => setPriority('medium')}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                />
                <span className="ml-2 text-sm text-gray-700">Medium</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={priority === 'high'}
                  onChange={() => setPriority('high')}
                  className="h-4 w-4 text-red-500 focus:ring-red-400"
                />
                <span className="ml-2 text-sm text-gray-700">High</span>
              </label>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTaskForm;
