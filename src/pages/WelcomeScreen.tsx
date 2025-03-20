import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Target } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="mb-8">
          <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
            <Target className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-center">Welcome to Incubator</h1>
          <p className="text-gray-600 text-center mt-2">
            Monitor and control your incubation environment with precision
          </p>
        </div>
        
        <div className="w-full max-w-xs space-y-4">
          <Link to="/login" className="block w-full">
            <Button fullWidth>Sign In</Button>
          </Link>
          <Link to="/signup" className="block w-full">
            <Button variant="outline" fullWidth>Create Account</Button>
          </Link>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our <a href="#" className="text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-600">Privacy Policy</a>
          </p>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Target className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium">Incubator App</span>
          </div>
          <span className="text-xs text-gray-500">v1.0.0</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
