import React from 'react';
import { useChat } from '../contexts/ChatContext';
import Button from './Button';
import { History, Trash2 } from 'lucide-react';

const ChatHistoryControls: React.FC = () => {
  const { showHistory, toggleHistory, clearHistory } = useChat();

  return (
    <div className="flex gap-2 mb-4">
      <Button
        variant="outline"
        onClick={toggleHistory}
        icon={<History className="h-4 w-4" />}
      >
        {showHistory ? 'Ẩn lịch sử' : 'Xem lịch sử'}
      </Button>
      <Button
        variant="outline"
        onClick={clearHistory}
        icon={<Trash2 className="h-4 w-4" />}
      >
        Xóa lịch sử
      </Button>
    </div>
  );
};

export default ChatHistoryControls;
