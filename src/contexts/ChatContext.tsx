import React, { createContext, useState, useContext, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatContextType {
  chatHistory: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearHistory: () => void;
  showHistory: boolean;
  toggleHistory: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    // Load chat history from localStorage if available
    const savedHistory = localStorage.getItem('chatHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Save chat history to localStorage whenever it changes
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const addMessage = (message: ChatMessage) => {
    setChatHistory(prev => [...prev, message]);
  };

  const clearHistory = () => {
    setChatHistory([]);
  };

  const toggleHistory = () => {
    setShowHistory(prev => !prev);
  };

  return (
    <ChatContext.Provider value={{
      chatHistory,
      addMessage,
      clearHistory,
      showHistory,
      toggleHistory
    }}>
      {children}
    </ChatContext.Provider>
  );
}
