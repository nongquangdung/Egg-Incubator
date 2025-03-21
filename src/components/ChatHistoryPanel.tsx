import React from 'react';
import { useChat } from '../contexts/ChatContext';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const ChatHistoryPanel: React.FC = () => {
  const { chatHistory, showHistory } = useChat();

  if (!showHistory) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h3 className="font-medium mb-4">Lịch sử trò chuyện</h3>
      <div className="space-y-3">
        {chatHistory.map(message => (
          <div key={message.id} className="flex flex-col">
            <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-100 text-blue-900' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p>{message.content}</p>
                <div className="text-xs text-gray-500 mt-1">
                  {format(new Date(message.timestamp), 'HH:mm, dd/MM/yyyy', { locale: vi })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistoryPanel;
