import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { IncubatorProvider } from './contexts/IncubatorContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <IncubatorProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </IncubatorProvider>
    </AuthProvider>
  </React.StrictMode>
);
