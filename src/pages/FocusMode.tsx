import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Send, Bot, User } from 'lucide-react';
import { useIncubator } from '../contexts/IncubatorContext';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const FocusMode: React.FC = () => {
  const { settings } = useIncubator();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-77781c68c7e045328efc322918c91c94`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `Bạn là chuyên gia về chăn nuôi gia cầm, gia súc, nông nghiệp và ấp trứng. Hãy trả lời bằng ${settings.language === 'en' ? 'English' : 'Tiếng Việt'}`
            },
            ...messages,
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      const data = await response.json();
      const assistantMessage = data.choices[0].message;
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: settings.language === 'en' 
            ? 'Sorry, something went wrong. Please try again.' 
            : 'Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mobile-container pb-20">
      <Header title={settings.language === 'en' ? 'Chat Assistant' : 'Trợ lý Chat'} />
      
      <div className="flex flex-col h-[calc(100vh-140px)] p-4">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}>
                <div className="flex items-center mb-1">
                  {msg.role === 'assistant' ? (
                    <Bot className="h-4 w-4 mr-2" />
                  ) : (
                    <User className="h-4 w-4 mr-2" />
                  )}
                  <span className="text-sm font-medium">
                    {msg.role === 'assistant' 
                      ? settings.language === 'en' ? 'Assistant' : 'Trợ lý'
                      : 'You'
                    }
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              settings.language === 'en' 
                ? 'Ask about poultry farming, incubation...' 
                : 'Hỏi về chăn nuôi gia cầm, ấp trứng...'
            }
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default FocusMode;
