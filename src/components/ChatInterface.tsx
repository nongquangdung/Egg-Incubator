import React, { useState } from 'react';
import { useChat } from '../contexts/ChatContext';
import ChatHistoryControls from './ChatHistoryControls';
import ChatHistoryPanel from './ChatHistoryPanel';
import { Send } from 'lucide-react';
import Button from './Button';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const { addMessage } = useChat();

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: input,
        timestamp: Date.now()
      };
      addMessage(newMessage);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHistoryControls />
      <ChatHistoryPanel />
      
      <div className="flex-1 overflow-y-auto mb-4">
        {/* Chat messages will be rendered here */}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
          placeholder="Nhập câu hỏi của bạn..."
        />
        <Button onClick={handleSend} icon={<Send className="h-4 w-4" />}>
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
