import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import Button from './Button';

const AIAvatarChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Welcome to AI Hub! I'm your AI assistant for careers and education. What would you like to explore today?",
      timestamp: new Date(),
      avatar: '🤖'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const aiResponses = [
    "That's a great question! Let me help you with that.",
    "I understand your concern. Here's what I recommend...",
    "Based on your profile, I suggest focusing on these areas...",
    "That's an excellent career path! Here are some steps to get started...",
    "I can help you with that. Let me provide some guidance...",
    "Great choice! This field has excellent growth potential.",
    "I'd be happy to help you explore that option further.",
    "That's a valuable skill to develop. Here's how you can start...",
    "I recommend checking out these resources for your learning journey...",
    "Based on current market trends, this is a smart direction to pursue."
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      avatar: '👤'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)] + " " + inputMessage,
        timestamp: new Date(),
        avatar: '🤖'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Career Advice", icon: "Briefcase" },
    { text: "Course Recommendations", icon: "BookOpen" },
    { text: "Resume Tips", icon: "FileText" },
    { text: "Interview Prep", icon: "MessageCircle" }
  ];

  const handleQuickAction = (action) => {
    const quickMessage = `Help me with ${action.text.toLowerCase()}`;
    setInputMessage(quickMessage);
    inputRef.current?.focus();
  };

  return (
    !isVisible ? null : (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-16 h-16' : 'w-96 h-[600px]'
    }`}>
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-bounce-in"
        >
          <Icon name="MessageCircle" size={24} color="white" />
        </button>
      ) : (
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 h-full flex flex-col animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 font-['Poppins']">AI Hub</h3>
                <p className="text-xs text-green-600 font-medium">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Icon name="Minus" size={16} color="#6B7280" />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Icon name="X" size={16} color="#6B7280" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">{message.avatar}</span>
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm font-['Inter']">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🤖</span>
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-t border-white/20">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className="flex items-center space-x-2 p-2 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-xs font-medium text-purple-700"
                >
                  <Icon name={action.icon} size={14} color="#7c3aed" />
                  <span>{action.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/20">
            <div className="flex items-center space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-['Inter']"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200"
              >
                <Icon name="Send" size={16} color="white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    )
  );
};

export default AIAvatarChat;
