import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import Button from './Button';

const ChatInterface = ({ messages, onSendMessage, isTyping, onVoiceToggle, isVoiceActive }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Gently focus the input when the chat mounts so users can start typing immediately
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleSend = () => {
    if (inputMessage?.trim()) {
      onSendMessage(inputMessage?.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (content) => {
    return content?.split('\n')?.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content?.split('\n')?.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 overflow-hidden">
      {/* Full Page GIF Background */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXMzN3QyZGRjZWFtYzlyem1yb3M5andhM2tnb2VrOHV1ZnRzMjkxdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Hrm0LJNRkPHDkLIHz9/giphy.gif" 
          alt="AI Teacher Avatar" 
          className="w-full h-full object-cover animate-pulse-glow animate-float-slow"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div style={{display: 'none'}} className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
          <Icon name="Bot" size={120} color="white" />
        </div>
      </div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
        <div className="text-center text-white backdrop-blur-sm bg-white/10 rounded-3xl p-8 border border-white/20 max-w-4xl mx-4">
          <h2 className="text-5xl md:text-7xl font-bold font-['Playfair_Display'] mb-6 drop-shadow-lg animate-slide-up-bounce">
            AI Teacher Assistant
          </h2>
          <div className="flex items-center justify-center space-x-4">
            <span className={`w-5 h-5 rounded-full ${isTyping ? 'bg-yellow-400 animate-pulse animate-heartbeat' : 'bg-green-400 animate-heartbeat'}`}></span>
            <span className="text-xl font-medium drop-shadow-md">
              {isTyping ? 'Thinking...' : 'Online • Ready to help'}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/20 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Icon name="MessageCircle" size={24} color="white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 font-['Poppins'] truncate">Chat with AI Teacher</h3>
            <p className="text-xs md:text-sm text-gray-600 flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${isTyping ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></span>
              <span className="truncate">{isTyping ? 'Typing...' : 'Active'}</span>
            </p>
          </div>
        </div>
        <Button
          variant={isVoiceActive ? "default" : "outline"}
          size="icon"
          onClick={onVoiceToggle}
          className={`w-12 h-12 md:w-12 md:h-12 rounded-xl touch-target ${isVoiceActive ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg" : "border-purple-300 text-purple-600 hover:bg-purple-50"}`}
        >
          <Icon name={isVoiceActive ? "MicOff" : "Mic"} size={20} />
        </Button>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-4 max-w-[90%] md:max-w-[85%] ${message?.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {message?.sender === 'ai' && (
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Icon name="Bot" size={20} color="white" />
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-lg ${
                  message?.sender === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                    : 'bg-white text-gray-900 border border-white/20 backdrop-blur-sm'
                }`}
              >
                <div className="text-sm leading-relaxed font-['Inter']">{formatMessage(message?.content)}</div>
                <div className={`text-xs mt-3 ${message?.sender === 'user' ? 'text-purple-100' : 'text-gray-500'}`}>
                  {message?.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message?.sender === 'user' && (
                <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Icon name="User" size={20} color="white" />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Bot" size={20} color="white" />
              </div>
              <div className="bg-white rounded-2xl px-6 py-4 border border-white/20 backdrop-blur-sm shadow-lg">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="p-4 md:p-6 border-t border-white/20 bg-white/80 backdrop-blur-sm">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your education, career, skills, or any guidance you need..."
              className="w-full resize-none rounded-2xl border border-white/30 bg-white/90 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[48px] md:min-h-[56px] max-h-[140px] transition-all duration-200 shadow-lg mobile-chat-input"
              rows={1}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!inputMessage?.trim() || isTyping}
            size="icon"
            className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl shadow-lg touch-target ${
              !inputMessage?.trim() || isTyping 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
            }`}
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputMessage("Analyze my resume")}
            className="text-xs md:text-sm border-purple-300 text-purple-600 hover:bg-purple-50 rounded-xl px-3 py-2 md:px-4 font-medium touch-target hover:scale-105 hover:-translate-y-1 transition-all duration-300 animate-slide-up-bounce group"
            style={{animationDelay: '0.1s'}}
          >
            <Icon name="FileText" size={14} className="mr-1 md:mr-2 group-hover:animate-wiggle" />
            <span className="hidden sm:inline">Resume Analysis</span>
            <span className="sm:hidden">Resume</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputMessage("What skills should I learn?")}
            className="text-xs md:text-sm border-blue-300 text-blue-600 hover:bg-blue-50 rounded-xl px-3 py-2 md:px-4 font-medium touch-target hover:scale-105 hover:-translate-y-1 transition-all duration-300 animate-slide-up-bounce group"
            style={{animationDelay: '0.2s'}}
          >
            <Icon name="Target" size={14} className="mr-1 md:mr-2 group-hover:animate-wiggle" />
            <span className="hidden sm:inline">Skill Recommendations</span>
            <span className="sm:hidden">Skills</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputMessage("Help me prepare for interviews")}
            className="text-xs md:text-sm border-teal-300 text-teal-600 hover:bg-teal-50 rounded-xl px-3 py-2 md:px-4 font-medium touch-target hover:scale-105 hover:-translate-y-1 transition-all duration-300 animate-slide-up-bounce group"
            style={{animationDelay: '0.3s'}}
          >
            <Icon name="MessageSquare" size={14} className="mr-1 md:mr-2 group-hover:animate-wiggle" />
            <span className="hidden sm:inline">Interview Prep</span>
            <span className="sm:hidden">Interview</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
