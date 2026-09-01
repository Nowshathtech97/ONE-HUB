import React, { useState, useEffect } from 'react';
import Icon from './Icon';

const Header = ({ isSidebarCollapsed, setIsSidebarCollapsed, userProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const courseSuggestions = [
    'React.js Fundamentals',
    'Node.js Backend Development',
    'Python Programming',
    'Machine Learning',
    'Data Science',
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Digital Marketing',
    'Cloud Computing'
  ];

  const internshipSuggestions = [
    'Software Development Intern',
    'Data Science Intern',
    'Marketing Intern',
    'Design Intern',
    'Business Analyst Intern',
    'Product Management Intern',
    'DevOps Intern',
    'Cybersecurity Intern',
    'AI/ML Intern',
    'Frontend Developer Intern'
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredCourses = courseSuggestions.filter(course =>
        course.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredInternships = internshipSuggestions.filter(internship =>
        internship.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions([...filteredCourses, ...filteredInternships]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg animate-slide-down">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 md:p-3 rounded-xl hover:bg-purple-50 transition-all duration-200 touch-target hover:scale-110 hover:animate-wiggle"
          >
            <Icon name={isSidebarCollapsed ? "Menu" : "X"} size={20} color="#7c3aed" />
          </button>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden animate-float-slow hover:animate-pulse-glow">
              <img 
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWJsa3c5Z3Z1YWRmYjdobTJydGk4cXBxdmk0ODZ5Nm4wZncxcjVjZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Vf3ZKdillTMOOaOho0/giphy.gif" 
                alt="ONE HUB Logo" 
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{display: 'none'}} className="w-full h-full flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-['Playfair_Display'] tracking-wide">ONE HUB</h1>
              <p className="text-xs md:text-sm text-gray-600 font-['Inter'] font-medium">Education & Career Hub</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-6">
          {/* Enhanced Search Bar - Hidden on mobile */}
          <div className="hidden lg:block relative">
            <div className="flex items-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl px-4 py-3 w-80 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <Icon name="Search" size={18} color="#7c3aed" />
              <input 
                type="text" 
                placeholder="Search courses, internships..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="ml-3 bg-transparent text-sm text-gray-700 placeholder-gray-500 focus:outline-none flex-1 font-['Inter']"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-purple-200 overflow-hidden z-50 animate-slide-down">
                <div className="p-2">
                  {suggestions.slice(0, 8).map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 px-3 py-2 hover:bg-purple-50 rounded-xl cursor-pointer transition-colors"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      <Icon 
                        name={suggestion.includes('Intern') ? "Briefcase" : "BookOpen"} 
                        size={16} 
                        color="#7c3aed" 
                      />
                      <span className="text-sm text-gray-700 font-['Inter']">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile Search Button */}
          <button className="lg:hidden p-2 rounded-xl hover:bg-purple-50 transition-all duration-200 touch-target">
            <Icon name="Search" size={20} color="#7c3aed" />
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-2 md:space-x-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl px-3 py-2 md:px-4 md:py-3 border border-purple-200 hover:shadow-lg transition-all duration-200">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xs md:text-sm font-bold">
                {userProfile?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-gray-900 font-['Poppins']">{userProfile?.name || 'Alex Johnson'}</p>
              <p className="text-xs text-gray-600 font-['Inter']">{userProfile?.currentRole || 'Student'}</p>
            </div>
            <Icon name="ChevronDown" size={16} color="#7c3aed" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
