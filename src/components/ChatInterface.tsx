import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, ShoppingCart, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you with web scraping today?',
      sender: 'ai',
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: '2',
      text: 'hello',
      sender: 'user',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '3',
      text: 'how are you?',
      sender: 'user',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: '4',
      text: 'I am functioning as expected. How can I assist you with web scraping today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'This is AI replying to your message',
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="flex flex-col h-screen bg-chat-background">
      {/* Chat Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
      >
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 animate-fade-in ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            <Avatar className={`w-10 h-10 ${
              message.sender === 'ai' 
                ? 'bg-chat-ai-bubble' 
                : 'bg-gradient-user'
            }`}>
              <AvatarFallback className={`${
                message.sender === 'ai' 
                  ? 'bg-chat-ai-bubble text-chat-ai-text' 
                  : 'bg-gradient-user text-chat-user-text'
              }`}>
                {message.sender === 'ai' ? (
                  <ShoppingCart className="w-5 h-5" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </AvatarFallback>
            </Avatar>

            {/* Message Content */}
            <div className={`flex flex-col max-w-[70%] ${
              message.sender === 'user' ? 'items-end' : 'items-start'
            }`}>
              {/* Sender Name & Title */}
              {message.sender === 'ai' && (
                <div className="mb-2">
                  <h3 className="text-foreground font-medium">WebScraper AI</h3>
                </div>
              )}
              
              {/* Message Bubble */}
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-user text-chat-user-text rounded-br-md shadow-glow'
                    : 'bg-transparent text-foreground'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>

              {/* Timestamp */}
              {message.sender === 'user' && (
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>{formatTime(message.timestamp)}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="sticky bottom-0 bg-chat-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-chat-input-bg rounded-2xl p-3 shadow-elevated">
            {/* Attachment Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-8 w-8"
            >
              <Paperclip className="w-4 h-4" />
            </Button>

            {/* Input Field */}
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message WebScraper AI..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
            />

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              size="icon"
              className="bg-gradient-send hover:bg-gradient-send/90 text-chat-user-text h-8 w-8 rounded-xl shadow-glow disabled:opacity-50 disabled:shadow-none"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;