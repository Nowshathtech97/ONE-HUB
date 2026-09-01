import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Icon from './components/Icon';
import Button from './components/Button';
import ChatInterface from './components/ChatInterface';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import MobileNavigation from './components/MobileNavigation';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import AIAvatarChat from './components/AIAvatarChat';
import CompanyVerifier from './components/CompanyVerifier';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Dragon',
    currentRole: 'Computer Science Student',
    targetRole: 'Software Engineer',
    experience: '2 years',
    university: 'University of Technology',
    major: 'Computer Science',
    year: 'Junior',
    email: 'dragon@university.edu',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate about technology and eager to learn new skills. Currently pursuing Computer Science with a focus on software development.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    resume: null
  });

  const [creditPoints, setCreditPoints] = useState({
    total: 1250,
    earned: 850,
    spent: 400,
    available: 450,
    transactions: [
      { id: 1, type: 'earned', amount: 100, description: 'Completed React.js Course', date: '2024-01-15', course: 'React.js Fundamentals' },
      { id: 2, type: 'earned', amount: 150, description: 'Completed Node.js Course', date: '2024-01-20', course: 'Node.js Backend Development' },
      { id: 3, type: 'earned', amount: 200, description: 'Completed AI/ML Course', date: '2024-02-01', course: 'Artificial Intelligence & Machine Learning' },
      { id: 4, type: 'spent', amount: 50, description: 'Premium Certificate', date: '2024-02-05', course: 'React.js Fundamentals' },
      { id: 5, type: 'earned', amount: 100, description: 'Completed Python Course', date: '2024-02-10', course: 'Python Programming' },
      { id: 6, type: 'spent', amount: 100, description: 'Advanced Course Access', date: '2024-02-12', course: 'System Design' },
      { id: 7, type: 'earned', amount: 300, description: 'Completed Full Stack Course', date: '2024-02-15', course: 'Full Stack Web Development' }
    ]
  });

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      name: 'React.js Fundamentals',
      provider: 'AICTE',
      date: '2024-01-15',
      score: 92,
      credits: 100,
      status: 'completed',
      downloadUrl: '#',
      verificationCode: 'AICTE-REACT-2024-001'
    },
    {
      id: 2,
      name: 'Node.js Backend Development',
      provider: 'Naan Mudhalvan',
      date: '2024-01-20',
      score: 88,
      credits: 150,
      status: 'completed',
      downloadUrl: '#',
      verificationCode: 'NM-NODE-2024-002'
    },
    {
      id: 3,
      name: 'Artificial Intelligence & Machine Learning',
      provider: 'AICTE',
      date: '2024-02-01',
      score: 95,
      credits: 200,
      status: 'completed',
      downloadUrl: '#',
      verificationCode: 'AICTE-AI-2024-003'
    },
    {
      id: 4,
      name: 'Python Programming',
      provider: 'Naan Mudhalvan',
      date: '2024-02-10',
      score: 90,
      credits: 100,
      status: 'completed',
      downloadUrl: '#',
      verificationCode: 'NM-PYTHON-2024-004'
    },
    {
      id: 5,
      name: 'Full Stack Web Development',
      provider: 'AICTE',
      date: '2024-02-15',
      score: 94,
      credits: 300,
      status: 'completed',
      downloadUrl: '#',
      verificationCode: 'AICTE-FULLSTACK-2024-005'
    }
  ]);

  // Initialize chat with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      sender: 'ai',
      content: `Hello ${userProfile?.name}! 👋\n\nI'm your AI Career Mentor, here to help you navigate your professional journey. I can assist you with:\n\n• Resume analysis and optimization\n• Career roadmap planning\n• Skill gap identification\n• Industry trend insights\n• Interview preparation\n• Salary benchmarking\n\nWhat would you like to explore today?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [userProfile?.name]);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard', description: 'Overview & Progress' },
    { id: 'chat', name: 'AI Hub', icon: 'Grid3x3', description: 'Smart guidance' },
    { id: 'resume', name: 'Resume Analysis', icon: 'FileText', description: 'AI optimization' },
    { id: 'courses', name: 'Courses', icon: 'BookOpen', description: 'Learning paths' },
    { id: 'credits', name: 'Credit Points', icon: 'Coins', description: 'Manage credits' },
    { id: 'engineering', name: 'Engineering Guide', icon: 'Cog', description: 'Department guidance' },
    { id: 'certificates', name: 'Certificates', icon: 'Award', description: 'View certificates' },
    { id: 'progress', name: 'Progress', icon: 'TrendingUp', description: 'Track growth' }
  ];

  const handleSendMessage = (message) => {
    const userMessage = {
      id: messages?.length + 1,
      sender: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const aiMessage = {
        id: messages?.length + 2,
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();
    
    if (lowerMessage?.includes('resume') || lowerMessage?.includes('cv')) {
      return `I'd be happy to help you with your resume! Here are some key areas I can assist with:\n\n• ATS optimization to pass automated screening\n• Skill gap analysis based on your target role\n• Formatting and structure improvements\n• Keyword optimization for your industry\n• Quantifying achievements with metrics\n\nWould you like to upload your resume for a detailed analysis? You can switch to the "Resume Analysis" tab for a comprehensive review.`;
    }
    
    if (lowerMessage?.includes('career') || lowerMessage?.includes('roadmap')) {
      return `Great question about career planning! Based on your profile as a ${userProfile?.currentRole} aiming to become a ${userProfile?.targetRole}, here's what I recommend:\n\n• Focus on backend technologies (Node.js, databases)\n• Learn about system design and architecture\n• Build full-stack projects for your portfolio\n• Consider cloud platforms (AWS, Azure)\n\nCheck out the "Career Roadmap" tab for a detailed visual path with timelines, milestones, and specific learning resources!`;
    }
    
    if (lowerMessage?.includes('skill') || lowerMessage?.includes('learn')) {
      return `Based on current market trends, here are the most in-demand skills for ${userProfile?.targetRole}:\n\n🔥 High Priority:\n• React.js & Node.js\n• Database management (MongoDB, PostgreSQL)\n• API development and integration\n• Version control (Git)\n\n📈 Growing Demand:\n• Cloud computing (AWS, Docker)\n• Testing frameworks\n• DevOps basics\n\nWould you like me to create a personalized learning plan with specific courses and timelines?`;
    }
    
    if (lowerMessage?.includes('salary') || lowerMessage?.includes('pay')) {
      return `Here's the current salary landscape for ${userProfile?.targetRole} in India:\n\n💰 Salary Ranges:\n• Entry Level (0-2 years): ₹4-8 LPA\n• Mid Level (2-5 years): ₹8-15 LPA\n• Senior Level (5+ years): ₹15-25 LPA\n\n📍 Top Paying Cities:\n• Bangalore: 20-30% above average\n• Mumbai: 15-25% above average\n• Hyderabad: 10-20% above average\n\nFactors affecting salary: skills, company size, domain expertise, and negotiation skills. Want tips on salary negotiation?`;
    }
    
    if (lowerMessage?.includes('interview') || lowerMessage?.includes('preparation')) {
      return `Interview preparation is crucial! Here's a comprehensive approach:\n\n🎯 Technical Preparation:\n• Data structures and algorithms\n• System design basics\n• Framework-specific questions\n• Code review and debugging\n\n💬 Behavioral Questions:\n• STAR method for storytelling\n• Project challenges and solutions\n• Team collaboration examples\n• Career goals alignment\n\n🛠️ Practical Tips:\n• Mock interviews with peers\n• Portfolio project walkthroughs\n• Company research and culture fit\n\nWould you like me to generate specific interview questions for your target role?`;
    }
    
    return `That's an interesting question! As your AI mentor, I'm here to help with various aspects of your career journey:\n\n• Career planning and roadmaps\n• Skill development strategies\n• Resume and interview preparation\n• Industry trends and insights\n• Salary benchmarking\n• Learning resource recommendations\n\nCould you be more specific about what you'd like guidance on? I'm here to provide personalized advice based on your goals as a ${userProfile?.currentRole} transitioning to ${userProfile?.targetRole}.`;
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
    // In a real implementation, this would handle voice recognition
  };

  const handleAnalysisComplete = (analysis) => {
    const analysisMessage = {
      id: messages?.length + 1,
      sender: 'ai',
      content: `Great! I've completed your resume analysis. Here are the key findings:\n\n📊 Overall Score: ${analysis?.overallScore}%\n🤖 ATS Compatibility: ${analysis?.atsScore}%\n\n✅ Strengths:\n${analysis?.strengths?.map(s => `• ${s}`)?.join('\n')}\n\n⚠️ Areas for Improvement:\n${analysis?.improvements?.map(i => `• ${i}`)?.join('\n')}\n\nWould you like specific recommendations for improving your resume or finding courses to fill skill gaps?`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, analysisMessage]);
  };


  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="py-8">
            <div className="mb-10">
              <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-lg px-8 py-6 md:px-10 md:py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-500">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-purple-500 mb-2">
                    Welcome back
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent font-['Poppins']">
                    {userProfile?.name?.split(' ')[0] || 'Alex'}, keep leveling up 🚀
                  </h2>
                  <p className="mt-3 text-base md:text-lg text-gray-700/90 max-w-2xl font-['Inter']">
                    Continue your learning journey and track your progress across courses, skills, and real-world experience.
                  </p>
                </div>
                <div className="flex items-center gap-4 md:gap-5 bg-white/40 border border-white/60 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                      {userProfile?.name?.charAt(0) || 'A'}
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-md"></span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current streak</p>
                    <p className="text-lg font-semibold text-gray-900">7 days</p>
                    <p className="text-xs text-gray-500">Don&apos;t break the chain ✨</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-stagger-1 animate-page-enter animate-float-slow group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Courses Completed</p>
                    <p className="text-4xl font-bold mt-2 animate-heartbeat">12</p>
                    <p className="text-purple-200 text-sm mt-1">+2 this month</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:animate-wiggle">
                    <Icon name="BookOpen" size={32} color="white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-stagger-2 animate-page-enter animate-float-slow group" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Certificates</p>
                    <p className="text-4xl font-bold mt-2 animate-heartbeat">{certificates.length}</p>
                    <p className="text-green-200 text-sm mt-1">+1 this week</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:animate-wiggle">
                    <Icon name="Award" size={32} color="white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-stagger-3 animate-page-enter animate-float-slow group" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Skills Learned</p>
                    <p className="text-4xl font-bold mt-2 animate-heartbeat">18</p>
                    <p className="text-blue-200 text-sm mt-1">+3 this month</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:animate-wiggle">
                    <Icon name="Target" size={32} color="white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-stagger-4 animate-page-enter animate-float-slow group" style={{animationDelay: '0.6s'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm font-medium">Credit Points</p>
                    <p className="text-4xl font-bold mt-2 animate-heartbeat">{creditPoints.available}</p>
                    <p className="text-yellow-200 text-sm mt-1">Available</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:animate-wiggle">
                    <Icon name="Coins" size={32} color="white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity - Takes 2 columns on large screens */}
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 animate-page-enter animate-stagger-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 font-['Poppins'] flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mr-3"></span>
                  Recent Activity
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all duration-300 border border-green-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
                      <Icon name="CheckCircle" size={24} color="white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold text-lg">Completed React.js Course</p>
                      <p className="text-gray-600 text-sm">2 hours ago</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">+100 XP</span>
                  </div>
                  <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:shadow-lg transition-all duration-300 border border-yellow-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <Icon name="Clock" size={24} color="white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold text-lg">Working on Node.js Project</p>
                      <p className="text-gray-600 text-sm">4 hours ago</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">In Progress</span>
                  </div>
                  <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-lg transition-all duration-300 border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Icon name="FileText" size={24} color="white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold text-lg">Updated Resume</p>
                      <p className="text-gray-600 text-sm">1 day ago</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Completed</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions - Takes 1 column on large screens */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 animate-page-enter animate-stagger-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 font-['Poppins'] flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-teal-500 to-green-500 rounded-full mr-3"></span>
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <Button 
                    onClick={() => setActiveTab('chat')}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Icon name="MessageCircle" size={20} className="mr-3" />
                    Chat with AI Assistant
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('resume')}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Icon name="FileText" size={20} className="mr-3" />
                    Analyze Resume
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('courses')}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Icon name="BookOpen" size={20} className="mr-3" />
                    Browse Courses
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('credits')}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Icon name="Coins" size={20} className="mr-3" />
                    Manage Credit Points
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('engineering')}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Icon name="Cog" size={20} className="mr-3" />
                    Engineering Guidance
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('certificates')}
                    className="w-full bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Icon name="Award" size={20} className="mr-3" />
                    View Certificates
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'chat':
        return (
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            onVoiceToggle={handleVoiceToggle}
            isVoiceActive={isVoiceActive}
          />
        );
      case 'resume':
        return <ResumeAnalyzer onAnalysisComplete={handleAnalysisComplete} />;
      case 'company':
        return <CompanyVerifier />;
      case 'courses':
        return (
          <div className="py-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4 font-['Poppins']">
                Technical & Non-Technical Courses 🎓
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-['Inter']">Comprehensive courses from AICTE, Naan Mudhalvan, and top institutions</p>
            </div>

            {/* Technical Courses Section */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 font-['Poppins'] flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-4"></span>
                Technical Courses 💻
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* AICTE Technical Courses */}
                {[
                  {
                    name: 'Artificial Intelligence & Machine Learning',
                    provider: 'AICTE',
                    duration: '6 months',
                    level: 'Advanced',
                    type: 'Technical',
                    description: 'Comprehensive AI/ML course covering algorithms, deep learning, and practical applications',
                    color: 'from-blue-500 to-indigo-600',
                    bgColor: 'from-blue-50 to-indigo-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '5000+',
                    rating: 4.8,
                    icon: 'Brain'
                  },
                  {
                    name: 'Cybersecurity & Ethical Hacking',
                    provider: 'AICTE',
                    duration: '4 months',
                    level: 'Intermediate',
                    type: 'Technical',
                    description: 'Learn cybersecurity fundamentals, penetration testing, and security protocols',
                    color: 'from-red-500 to-red-600',
                    bgColor: 'from-red-50 to-red-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '3200+',
                    rating: 4.7,
                    icon: 'Shield'
                  },
                  {
                    name: 'Cloud Computing & DevOps',
                    provider: 'AICTE',
                    duration: '5 months',
                    level: 'Intermediate',
                    type: 'Technical',
                    description: 'Master AWS, Azure, Docker, Kubernetes, and CI/CD pipelines',
                    color: 'from-green-500 to-teal-600',
                    bgColor: 'from-green-50 to-teal-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '4100+',
                    rating: 4.9,
                    icon: 'Cloud'
                  },
                  {
                    name: 'Full Stack Web Development',
                    provider: 'Naan Mudhalvan',
                    duration: '6 months',
                    level: 'Beginner',
                    type: 'Technical',
                    description: 'Complete web development with React, Node.js, MongoDB, and modern frameworks',
                    color: 'from-purple-500 to-pink-600',
                    bgColor: 'from-purple-50 to-pink-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '6800+',
                    rating: 4.6,
                    icon: 'Code'
                  },
                  {
                    name: 'Mobile App Development',
                    provider: 'Naan Mudhalvan',
                    duration: '4 months',
                    level: 'Intermediate',
                    type: 'Technical',
                    description: 'Build Android and iOS apps using React Native and Flutter',
                    color: 'from-orange-500 to-red-600',
                    bgColor: 'from-orange-50 to-red-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '2900+',
                    rating: 4.5,
                    icon: 'Smartphone'
                  },
                  {
                    name: 'Data Science & Analytics',
                    provider: 'AICTE',
                    duration: '7 months',
                    level: 'Advanced',
                    type: 'Technical',
                    description: 'Python, R, SQL, statistical analysis, and data visualization',
                    color: 'from-indigo-500 to-purple-600',
                    bgColor: 'from-indigo-50 to-purple-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '5500+',
                    rating: 4.8,
                    icon: 'BarChart'
                  },
                  {
                    name: 'Blockchain Technology',
                    provider: 'AICTE',
                    duration: '3 months',
                    level: 'Advanced',
                    type: 'Technical',
                    description: 'Learn blockchain fundamentals, smart contracts, and cryptocurrency',
                    color: 'from-yellow-500 to-orange-600',
                    bgColor: 'from-yellow-50 to-orange-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '1800+',
                    rating: 4.4,
                    icon: 'Link'
                  },
                  {
                    name: 'IoT & Embedded Systems',
                    provider: 'Naan Mudhalvan',
                    duration: '5 months',
                    level: 'Intermediate',
                    type: 'Technical',
                    description: 'Internet of Things, Arduino, Raspberry Pi, and sensor networks',
                    color: 'from-teal-500 to-green-600',
                    bgColor: 'from-teal-50 to-green-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '2200+',
                    rating: 4.3,
                    icon: 'Cpu'
                  },
                  {
                    name: 'Robotics & Automation',
                    provider: 'AICTE',
                    duration: '6 months',
                    level: 'Advanced',
                    type: 'Technical',
                    description: 'Robotics programming, automation systems, and AI integration',
                    color: 'from-gray-500 to-gray-600',
                    bgColor: 'from-gray-50 to-gray-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '1500+',
                    rating: 4.7,
                    icon: 'Bot'
                  }
                ].map((course, index) => (
                  <div key={index} className={`bg-gradient-to-br ${course.bgColor} rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon name={course.icon} size={24} color="white" />
                      </div>
                      <span className={`px-3 py-1 bg-gradient-to-r ${course.color} text-white rounded-full text-xs font-semibold`}>
                        {course.type}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">{course.name}</h4>
                    <p className="text-gray-700 mb-3 font-['Inter']">{course.provider}</p>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="TrendingUp" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{course.level}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Users" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{course.students}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Award" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">Certificate: {course.certificate}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Icon key={i} name="Star" size={16} color={i < Math.floor(course.rating) ? "#FCD34D" : "#E5E7EB"} />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{course.rating}</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">{course.fee}</span>
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${course.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                      onClick={() => {
                        if (course.provider === 'AICTE') {
                          window.open('https://www.aicte-india.org/', '_blank');
                        } else if (course.provider === 'Naan Mudhalvan') {
                          window.open('https://naanmudhalvan.tn.gov.in/', '_blank');
                        }
                      }}
                    >
                      Apply Directly
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-Technical Courses Section */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 font-['Poppins'] flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-4"></span>
                Non-Technical Courses 📚
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* AICTE & Naan Mudhalvan Non-Technical Courses */}
                {[
                  {
                    name: 'Digital Marketing & Social Media',
                    provider: 'Naan Mudhalvan',
                    duration: '3 months',
                    level: 'Beginner',
                    type: 'Non-Technical',
                    description: 'Learn digital marketing strategies, SEO, social media management, and content creation',
                    color: 'from-pink-500 to-rose-600',
                    bgColor: 'from-pink-50 to-rose-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '4500+',
                    rating: 4.6,
                    icon: 'TrendingUp'
                  },
                  {
                    name: 'Entrepreneurship & Business Management',
                    provider: 'AICTE',
                    duration: '4 months',
                    level: 'Intermediate',
                    type: 'Non-Technical',
                    description: 'Start your own business, learn management skills, and financial planning',
                    color: 'from-indigo-500 to-purple-600',
                    bgColor: 'from-indigo-50 to-purple-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '3200+',
                    rating: 4.7,
                    icon: 'Briefcase'
                  },
                  {
                    name: 'Communication & Soft Skills',
                    provider: 'Naan Mudhalvan',
                    duration: '2 months',
                    level: 'Beginner',
                    type: 'Non-Technical',
                    description: 'Improve communication, presentation skills, and professional development',
                    color: 'from-blue-500 to-cyan-600',
                    bgColor: 'from-blue-50 to-cyan-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '6800+',
                    rating: 4.5,
                    icon: 'MessageCircle'
                  },
                  {
                    name: 'Financial Literacy & Investment',
                    provider: 'AICTE',
                    duration: '3 months',
                    level: 'Beginner',
                    type: 'Non-Technical',
                    description: 'Learn personal finance, investment strategies, and wealth management',
                    color: 'from-green-500 to-emerald-600',
                    bgColor: 'from-green-50 to-emerald-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '2900+',
                    rating: 4.8,
                    icon: 'DollarSign'
                  },
                  {
                    name: 'Content Writing & Copywriting',
                    provider: 'Naan Mudhalvan',
                    duration: '2 months',
                    level: 'Beginner',
                    type: 'Non-Technical',
                    description: 'Master content creation, copywriting, and creative writing skills',
                    color: 'from-orange-500 to-amber-600',
                    bgColor: 'from-orange-50 to-amber-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '4100+',
                    rating: 4.4,
                    icon: 'Edit'
                  },
                  {
                    name: 'Project Management',
                    provider: 'AICTE',
                    duration: '4 months',
                    level: 'Intermediate',
                    type: 'Non-Technical',
                    description: 'Learn project planning, team management, and agile methodologies',
                    color: 'from-purple-500 to-violet-600',
                    bgColor: 'from-purple-50 to-violet-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '2500+',
                    rating: 4.6,
                    icon: 'Target'
                  },
                  {
                    name: 'Graphic Design & Multimedia',
                    provider: 'Naan Mudhalvan',
                    duration: '5 months',
                    level: 'Beginner',
                    type: 'Non-Technical',
                    description: 'Learn Photoshop, Illustrator, video editing, and multimedia production',
                    color: 'from-red-500 to-pink-600',
                    bgColor: 'from-red-50 to-pink-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '3600+',
                    rating: 4.5,
                    icon: 'Palette'
                  },
                  {
                    name: 'Language Learning (English)',
                    provider: 'AICTE',
                    duration: '6 months',
                    level: 'Beginner',
                    type: 'Non-Technical',
                    description: 'Improve English speaking, writing, and communication skills',
                    color: 'from-teal-500 to-cyan-600',
                    bgColor: 'from-teal-50 to-cyan-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '5200+',
                    rating: 4.7,
                    icon: 'BookOpen'
                  },
                  {
                    name: 'Healthcare & Medical Assistant',
                    provider: 'Naan Mudhalvan',
                    duration: '6 months',
                    level: 'Intermediate',
                    type: 'Non-Technical',
                    description: 'Basic healthcare knowledge, first aid, and medical terminology',
                    color: 'from-emerald-500 to-green-600',
                    bgColor: 'from-emerald-50 to-green-100',
                    certificate: 'Yes',
                    fee: 'Free',
                    students: '1800+',
                    rating: 4.9,
                    icon: 'Heart'
                  }
                ].map((course, index) => (
                  <div key={index} className={`bg-gradient-to-br ${course.bgColor} rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon name={course.icon} size={24} color="white" />
                      </div>
                      <span className={`px-3 py-1 bg-gradient-to-r ${course.color} text-white rounded-full text-xs font-semibold`}>
                        {course.type}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">{course.name}</h4>
                    <p className="text-gray-700 mb-3 font-['Inter']">{course.provider}</p>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="TrendingUp" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{course.level}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Users" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{course.students}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Award" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">Certificate: {course.certificate}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Icon key={i} name="Star" size={16} color={i < Math.floor(course.rating) ? "#FCD34D" : "#E5E7EB"} />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{course.rating}</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">{course.fee}</span>
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${course.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                      onClick={() => {
                        if (course.provider === 'AICTE') {
                          window.open('https://www.aicte-india.org/', '_blank');
                        } else if (course.provider === 'Naan Mudhalvan') {
                          window.open('https://naanmudhalvan.tn.gov.in/', '_blank');
                        }
                      }}
                    >
                      Apply Directly
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Application Info */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-['Poppins'] text-center">How to Apply for Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Icon name="ExternalLink" size={20} className="mr-2 text-purple-600" />
                    AICTE Courses
                  </h4>
                  <p className="text-gray-600 mb-2">Visit: <a href="https://www.aicte.gov.in/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">www.aicte.gov.in</a></p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Register on the AICTE portal</li>
                    <li>• Browse available courses</li>
                    <li>• Apply directly through the platform</li>
                    <li>• Get government-recognized certificates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Icon name="ExternalLink" size={20} className="mr-2 text-blue-600" />
                    Naan Mudhalvan Courses
                  </h4>
                  <p className="text-gray-600 mb-2">Visit: <a href="https://naanmudhalvan.tn.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">naanmudhalvan.tn.gov.in</a></p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Tamil Nadu government initiative</li>
                    <li>• Free courses with stipends</li>
                    <li>• Industry-relevant curriculum</li>
                    <li>• Job placement assistance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'credits':
        return (
          <div className="py-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4 font-['Poppins']">
                Credit Points Management 💰
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-['Inter']">Track your earned credits and manage your learning rewards</p>
            </div>

            {/* Credit Points Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Total Earned</p>
                    <p className="text-3xl font-bold mt-2">{creditPoints.earned}</p>
                  </div>
                  <Icon name="TrendingUp" size={32} color="white" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Available</p>
                    <p className="text-3xl font-bold mt-2">{creditPoints.available}</p>
                  </div>
                  <Icon name="Coins" size={32} color="white" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Spent</p>
                    <p className="text-3xl font-bold mt-2">{creditPoints.spent}</p>
                  </div>
                  <Icon name="ShoppingCart" size={32} color="white" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Total Balance</p>
                    <p className="text-3xl font-bold mt-2">{creditPoints.total}</p>
                  </div>
                  <Icon name="Wallet" size={32} color="white" />
                </div>
              </div>
            </div>

            {/* Credit Transactions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-['Poppins'] flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-3"></span>
                Credit Transaction History
              </h3>
              <div className="space-y-4">
                {creditPoints.transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        transaction.type === 'earned' 
                          ? 'bg-gradient-to-br from-green-400 to-green-500' 
                          : 'bg-gradient-to-br from-orange-400 to-orange-500'
                      }`}>
                        <Icon 
                          name={transaction.type === 'earned' ? 'Plus' : 'Minus'} 
                          size={24} 
                          color="white" 
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{transaction.course}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        transaction.type === 'earned' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                      </p>
                      <p className="text-xs text-gray-500">Credits</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'engineering':
        return (
          <div className="py-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4 font-['Poppins']">
                Engineering Department Guidance 🔧
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-['Inter']">Comprehensive guidance for all engineering disciplines</p>
            </div>

            {/* Engineering Departments */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  name: 'Computer Science & Engineering',
                  icon: 'Cpu',
                  color: 'from-blue-500 to-indigo-600',
                  bgColor: 'from-blue-50 to-indigo-100',
                  description: 'Software development, algorithms, AI/ML',
                  careerPaths: ['Software Engineer', 'Data Scientist', 'AI Engineer'],
                  skills: ['Programming', 'Data Structures', 'Machine Learning'],
                  courses: 15,
                  avgSalary: '₹8-25 LPA'
                },
                {
                  name: 'Electronics & Communication',
                  icon: 'Radio',
                  color: 'from-green-500 to-teal-600',
                  bgColor: 'from-green-50 to-teal-100',
                  description: 'Circuit design, communication systems',
                  careerPaths: ['Electronics Engineer', 'Telecom Engineer', 'Embedded Systems'],
                  skills: ['Circuit Design', 'Signal Processing', 'VLSI'],
                  courses: 12,
                  avgSalary: '₹6-20 LPA'
                },
                {
                  name: 'Mechanical Engineering',
                  icon: 'Cog',
                  color: 'from-orange-500 to-red-600',
                  bgColor: 'from-orange-50 to-red-100',
                  description: 'Design, manufacturing, thermal systems',
                  careerPaths: ['Mechanical Engineer', 'Design Engineer', 'Production Manager'],
                  skills: ['CAD/CAM', 'Thermodynamics', 'Manufacturing'],
                  courses: 14,
                  avgSalary: '₹5-18 LPA'
                },
                {
                  name: 'Civil Engineering',
                  icon: 'Building',
                  color: 'from-gray-500 to-gray-600',
                  bgColor: 'from-gray-50 to-gray-100',
                  description: 'Infrastructure, construction, structural design',
                  careerPaths: ['Civil Engineer', 'Structural Engineer', 'Project Manager'],
                  skills: ['Structural Design', 'Construction', 'Surveying'],
                  courses: 13,
                  avgSalary: '₹4-15 LPA'
                },
                {
                  name: 'Electrical Engineering',
                  icon: 'Zap',
                  color: 'from-yellow-500 to-orange-600',
                  bgColor: 'from-yellow-50 to-orange-100',
                  description: 'Power systems, electrical machines',
                  careerPaths: ['Electrical Engineer', 'Power Engineer', 'Control Systems'],
                  skills: ['Power Systems', 'Control Theory', 'Electrical Machines'],
                  courses: 11,
                  avgSalary: '₹5-16 LPA'
                },
                {
                  name: 'Chemical Engineering',
                  icon: 'FlaskConical',
                  color: 'from-purple-500 to-pink-600',
                  bgColor: 'from-purple-50 to-pink-100',
                  description: 'Chemical processes, materials science',
                  careerPaths: ['Chemical Engineer', 'Process Engineer', 'Research Scientist'],
                  skills: ['Process Design', 'Chemistry', 'Materials Science'],
                  courses: 10,
                  avgSalary: '₹6-22 LPA'
                }
              ].map((dept, index) => (
                <div key={index} className={`bg-gradient-to-br ${dept.bgColor} rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${dept.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon name={dept.icon} size={24} color="white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{dept.courses} Courses</span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">{dept.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{dept.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Career Paths:</p>
                      <div className="flex flex-wrap gap-1">
                        {dept.careerPaths.map((path, i) => (
                          <span key={i} className="px-2 py-1 bg-white/60 text-xs rounded-full text-gray-700">
                            {path}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Key Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {dept.skills.map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-white/60 text-xs rounded-full text-gray-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-green-600">{dept.avgSalary}</span>
                    <span className="text-sm text-gray-600">Avg. Salary</span>
                  </div>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${dept.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                    onClick={() => setActiveTab('courses')}
                  >
                    Explore Courses
                  </Button>
                </div>
              ))}
            </div>

            {/* Engineering Guidance Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-['Poppins'] text-center">Engineering Career Guidance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Icon name="Target" size={20} className="mr-2 text-blue-600" />
                    Career Planning Tips
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Choose specialization based on market demand</li>
                    <li>• Build strong foundation in mathematics and physics</li>
                    <li>• Participate in internships and projects</li>
                    <li>• Stay updated with latest technologies</li>
                    <li>• Develop soft skills alongside technical skills</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Icon name="TrendingUp" size={20} className="mr-2 text-green-600" />
                    Industry Trends
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• AI/ML integration in all engineering fields</li>
                    <li>• Sustainable engineering practices</li>
                    <li>• IoT and smart systems development</li>
                    <li>• Renewable energy technologies</li>
                    <li>• Digital transformation in manufacturing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'certificates':
        return (
          <div className="py-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4 font-['Poppins']">
                My Certificates 🏆
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-['Inter']">View and download your completed course certificates</p>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Icon name="Award" size={24} color="white" />
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {cert.status}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">{cert.name}</h4>
                  <p className="text-gray-700 mb-3 font-['Inter']">{cert.provider}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} color="#6B7280" />
                      <span className="text-sm text-gray-600">Completed: {cert.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Star" size={16} color="#6B7280" />
                      <span className="text-sm text-gray-600">Score: {cert.score}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Coins" size={16} color="#6B7280" />
                      <span className="text-sm text-gray-600">Credits: {cert.credits}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={16} color="#6B7280" />
                      <span className="text-sm text-gray-600">Code: {cert.verificationCode}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => {
                        // Simulate certificate download
                        alert(`Downloading certificate: ${cert.name}`);
                      }}
                    >
                      <Icon name="Download" size={16} className="mr-2" />
                      Download
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => {
                        // Simulate certificate verification
                        alert(`Verification Code: ${cert.verificationCode}\n\nThis certificate can be verified on the provider's website.`);
                      }}
                    >
                      <Icon name="Shield" size={16} className="mr-2" />
                      Verify
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Certificate Stats */}
            <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-['Poppins'] text-center">Certificate Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="Award" size={32} color="white" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{certificates.length}</p>
                  <p className="text-gray-600">Total Certificates</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="Star" size={32} color="white" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.round(certificates.reduce((acc, cert) => acc + cert.score, 0) / certificates.length)}%
                  </p>
                  <p className="text-gray-600">Average Score</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="Coins" size={32} color="white" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {certificates.reduce((acc, cert) => acc + cert.credits, 0)}
                  </p>
                  <p className="text-gray-600">Total Credits Earned</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'progress':
        return (
          <div className="py-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Progress</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Track your learning journey and celebrate achievements</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Learning Path</h3>
                <div className="space-y-6">
                  {[
                    { skill: 'HTML/CSS', level: 90, color: 'bg-green-500', icon: 'Code' },
                    { skill: 'JavaScript', level: 75, color: 'bg-blue-500', icon: 'Zap' },
                    { skill: 'React.js', level: 60, color: 'bg-purple-500', icon: 'Layers' },
                    { skill: 'Node.js', level: 45, color: 'bg-yellow-500', icon: 'Server' },
                    { skill: 'Database', level: 30, color: 'bg-red-500', icon: 'Database' }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Icon name={item.icon} size={20} color="#6B7280" />
                          </div>
                          <span className="text-gray-900 font-medium">{item.skill}</span>
                        </div>
                        <span className="text-teal-600 font-semibold">{item.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`${item.color} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${item.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'First Course', icon: 'Award', color: 'text-yellow-600', bgColor: 'bg-yellow-100', description: 'Completed your first course' },
                    { name: 'Code Master', icon: 'Code', color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'Solved 100+ problems' },
                    { name: 'Project Builder', icon: 'Wrench', color: 'text-green-600', bgColor: 'bg-green-100', description: 'Built 5+ projects' },
                    { name: 'Team Player', icon: 'Users', color: 'text-purple-600', bgColor: 'bg-purple-100', description: 'Collaborated on projects' }
                  ].map((achievement, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className={`w-16 h-16 ${achievement.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <Icon name={achievement.icon} size={32} className={achievement.color} />
                      </div>
                      <p className="text-gray-900 font-medium mb-1">{achievement.name}</p>
                      <p className="text-gray-500 text-xs">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'internships':
        return (
          <div className="py-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4 font-['Poppins']">
                Internships & Courses 🚀
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-['Inter']">Discover amazing internship opportunities and free courses from top companies</p>
            </div>

            {/* Internship Opportunities */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 font-['Poppins'] flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mr-4"></span>
                Stipend Internships 💼
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* MNC Internships */}
                {[
                  {
                    company: 'Google',
                    role: 'Software Engineering Intern',
                    stipend: '₹50,000/month',
                    duration: '3 months',
                    location: 'Bangalore, Mumbai',
                    type: 'MNC',
                    requirements: 'Python, Java, React',
                    description: 'Work on cutting-edge projects and learn from industry experts',
                    color: 'from-red-500 to-red-600',
                    bgColor: 'from-red-50 to-red-100'
                  },
                  {
                    company: 'Microsoft',
                    role: 'Data Science Intern',
                    stipend: '₹45,000/month',
                    duration: '6 months',
                    location: 'Hyderabad',
                    type: 'MNC',
                    requirements: 'Python, ML, SQL',
                    description: 'Analyze large datasets and build ML models',
                    color: 'from-blue-500 to-blue-600',
                    bgColor: 'from-blue-50 to-blue-100'
                  },
                  {
                    company: 'Amazon',
                    role: 'Cloud Computing Intern',
                    stipend: '₹40,000/month',
                    duration: '4 months',
                    location: 'Chennai, Pune',
                    type: 'MNC',
                    requirements: 'AWS, Python, Linux',
                    description: 'Work with AWS services and cloud infrastructure',
                    color: 'from-orange-500 to-orange-600',
                    bgColor: 'from-orange-50 to-orange-100'
                  },
                  {
                    company: 'TCS',
                    role: 'Full Stack Developer Intern',
                    stipend: '₹25,000/month',
                    duration: '6 months',
                    location: 'Multiple Cities',
                    type: 'MNC',
                    requirements: 'JavaScript, Node.js, React',
                    description: 'Build end-to-end web applications',
                    color: 'from-indigo-500 to-indigo-600',
                    bgColor: 'from-indigo-50 to-indigo-100'
                  },
                  {
                    company: 'Infosys',
                    role: 'AI/ML Intern',
                    stipend: '₹30,000/month',
                    duration: '5 months',
                    location: 'Bangalore, Mysore',
                    type: 'MNC',
                    requirements: 'Python, TensorFlow, NLP',
                    description: 'Develop AI solutions for business problems',
                    color: 'from-green-500 to-green-600',
                    bgColor: 'from-green-50 to-green-100'
                  },
                  {
                    company: 'Wipro',
                    role: 'Cybersecurity Intern',
                    stipend: '₹28,000/month',
                    duration: '4 months',
                    location: 'Bangalore, Chennai',
                    type: 'MNC',
                    requirements: 'Security, Network, Python',
                    description: 'Learn about cybersecurity and threat analysis',
                    color: 'from-purple-500 to-purple-600',
                    bgColor: 'from-purple-50 to-purple-100'
                  }
                ].map((internship, index) => (
                  <div key={index} className={`bg-gradient-to-br ${internship.bgColor} rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${internship.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <span className="text-white text-lg font-bold">{internship.company.charAt(0)}</span>
                      </div>
                      <span className={`px-3 py-1 bg-gradient-to-r ${internship.color} text-white rounded-full text-xs font-semibold`}>
                        {internship.type}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">{internship.role}</h4>
                    <p className="text-gray-700 mb-3 font-['Inter']">{internship.company}</p>
                    <p className="text-sm text-gray-600 mb-4">{internship.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="DollarSign" size={16} color="#6B7280" />
                        <span className="text-sm font-semibold text-gray-700">{internship.stipend}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{internship.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="MapPin" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{internship.location}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Requirements:</p>
                      <p className="text-sm text-gray-600">{internship.requirements}</p>
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${internship.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                      onClick={() => {
                        // Open company career pages
                        const companyUrls = {
                          'Google': 'https://careers.google.com/jobs/results/',
                          'Microsoft': 'https://careers.microsoft.com/us/en/search-results',
                          'Amazon': 'https://www.amazon.jobs/en/search',
                          'TCS': 'https://www.tcs.com/careers',
                          'Infosys': 'https://www.infosys.com/careers/',
                          'Wipro': 'https://careers.wipro.com/',
                          'Zomato': 'https://careers.zomato.com/',
                          'Swiggy': 'https://careers.swiggy.com/',
                          'Razorpay': 'https://razorpay.com/careers/',
                          'Byju\'s': 'https://byjus.com/careers/',
                          'Ola': 'https://www.olacabs.com/careers',
                          'Flipkart': 'https://www.flipkartcareers.com/#!/joblist'
                        };
                        const url = companyUrls[internship.company] || 'https://www.linkedin.com/jobs/';
                        window.open(url, '_blank');
                      }}
                    >
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Startup Internships */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 font-['Poppins'] flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-teal-500 to-green-500 rounded-full mr-4"></span>
                Startup Internships 🚀
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    company: 'Zomato',
                    role: 'Product Management Intern',
                    stipend: '₹35,000/month',
                    duration: '3 months',
                    location: 'Gurgaon',
                    type: 'Startup',
                    requirements: 'Analytics, Product Thinking',
                    description: 'Work on product features and user experience',
                    color: 'from-red-500 to-pink-600',
                    bgColor: 'from-red-50 to-pink-100'
                  },
                  {
                    company: 'Swiggy',
                    role: 'Mobile App Developer',
                    stipend: '₹32,000/month',
                    duration: '4 months',
                    location: 'Bangalore',
                    type: 'Startup',
                    requirements: 'React Native, JavaScript',
                    description: 'Build mobile applications for food delivery',
                    color: 'from-orange-500 to-red-600',
                    bgColor: 'from-orange-50 to-red-100'
                  },
                  {
                    company: 'Razorpay',
                    role: 'Fintech Intern',
                    stipend: '₹40,000/month',
                    duration: '6 months',
                    location: 'Bangalore',
                    type: 'Startup',
                    requirements: 'Fintech, Payment Systems',
                    description: 'Work on payment solutions and fintech products',
                    color: 'from-blue-500 to-indigo-600',
                    bgColor: 'from-blue-50 to-indigo-100'
                  },
                  {
                    company: 'Byju\'s',
                    role: 'EdTech Intern',
                    stipend: '₹25,000/month',
                    duration: '5 months',
                    location: 'Bangalore',
                    type: 'Startup',
                    requirements: 'Education Technology, Content',
                    description: 'Develop educational content and platforms',
                    color: 'from-purple-500 to-pink-600',
                    bgColor: 'from-purple-50 to-pink-100'
                  },
                  {
                    company: 'Ola',
                    role: 'Data Analytics Intern',
                    stipend: '₹30,000/month',
                    duration: '4 months',
                    location: 'Bangalore',
                    type: 'Startup',
                    requirements: 'Python, SQL, Analytics',
                    description: 'Analyze transportation data and patterns',
                    color: 'from-green-500 to-teal-600',
                    bgColor: 'from-green-50 to-teal-100'
                  },
                  {
                    company: 'Flipkart',
                    role: 'E-commerce Intern',
                    stipend: '₹28,000/month',
                    duration: '6 months',
                    location: 'Bangalore',
                    type: 'Startup',
                    requirements: 'E-commerce, Supply Chain',
                    description: 'Work on e-commerce platform and logistics',
                    color: 'from-yellow-500 to-orange-600',
                    bgColor: 'from-yellow-50 to-orange-100'
                  }
                ].map((internship, index) => (
                  <div key={index} className={`bg-gradient-to-br ${internship.bgColor} rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${internship.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <span className="text-white text-lg font-bold">{internship.company.charAt(0)}</span>
                      </div>
                      <span className={`px-3 py-1 bg-gradient-to-r ${internship.color} text-white rounded-full text-xs font-semibold`}>
                        {internship.type}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">{internship.role}</h4>
                    <p className="text-gray-700 mb-3 font-['Inter']">{internship.company}</p>
                    <p className="text-sm text-gray-600 mb-4">{internship.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="DollarSign" size={16} color="#6B7280" />
                        <span className="text-sm font-semibold text-gray-700">{internship.stipend}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{internship.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="MapPin" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{internship.location}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Requirements:</p>
                      <p className="text-sm text-gray-600">{internship.requirements}</p>
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${internship.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                      onClick={() => {
                        // Open company career pages
                        const companyUrls = {
                          'Google': 'https://careers.google.com/jobs/results/',
                          'Microsoft': 'https://careers.microsoft.com/us/en/search-results',
                          'Amazon': 'https://www.amazon.jobs/en/search',
                          'TCS': 'https://www.tcs.com/careers',
                          'Infosys': 'https://www.infosys.com/careers/',
                          'Wipro': 'https://careers.wipro.com/',
                          'Zomato': 'https://careers.zomato.com/',
                          'Swiggy': 'https://careers.swiggy.com/',
                          'Razorpay': 'https://razorpay.com/careers/',
                          'Byju\'s': 'https://byjus.com/careers/',
                          'Ola': 'https://www.olacabs.com/careers',
                          'Flipkart': 'https://www.flipkartcareers.com/#!/joblist'
                        };
                        const url = companyUrls[internship.company] || 'https://www.linkedin.com/jobs/';
                        window.open(url, '_blank');
                      }}
                    >
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Free Courses Section */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 font-['Poppins'] flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-4"></span>
                Free Courses from MNCs & Government 🎓
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* MNC Free Courses */}
                {[
                  {
                    provider: 'Google',
                    course: 'Machine Learning Crash Course',
                    duration: '15 hours',
                    level: 'Beginner',
                    type: 'Technical',
                    description: 'Learn ML fundamentals with TensorFlow',
                    color: 'from-red-500 to-red-600',
                    bgColor: 'from-red-50 to-red-100',
                    certificate: 'Yes'
                  },
                  {
                    provider: 'Microsoft',
                    course: 'Azure Fundamentals',
                    duration: '20 hours',
                    level: 'Intermediate',
                    type: 'Technical',
                    description: 'Cloud computing with Microsoft Azure',
                    color: 'from-blue-500 to-blue-600',
                    bgColor: 'from-blue-50 to-blue-100',
                    certificate: 'Yes'
                  },
                  {
                    provider: 'Amazon',
                    course: 'AWS Cloud Practitioner',
                    duration: '25 hours',
                    level: 'Beginner',
                    type: 'Technical',
                    description: 'AWS cloud services and architecture',
                    color: 'from-orange-500 to-orange-600',
                    bgColor: 'from-orange-50 to-orange-100',
                    certificate: 'Yes'
                  },
                  {
                    provider: 'IBM',
                    course: 'Data Science Professional',
                    duration: '40 hours',
                    level: 'Intermediate',
                    type: 'Technical',
                    description: 'Complete data science curriculum',
                    color: 'from-indigo-500 to-indigo-600',
                    bgColor: 'from-indigo-50 to-indigo-100',
                    certificate: 'Yes'
                  },
                  {
                    provider: 'Meta',
                    course: 'React Development',
                    duration: '30 hours',
                    level: 'Intermediate',
                    type: 'Technical',
                    description: 'Build modern web applications with React',
                    color: 'from-blue-500 to-indigo-600',
                    bgColor: 'from-blue-50 to-indigo-100',
                    certificate: 'Yes'
                  },
                  {
                    provider: 'Cisco',
                    course: 'Networking Fundamentals',
                    duration: '35 hours',
                    level: 'Beginner',
                    type: 'Technical',
                    description: 'Computer networking and security basics',
                    color: 'from-green-500 to-green-600',
                    bgColor: 'from-green-50 to-green-100',
                    certificate: 'Yes'
                  }
                ].map((course, index) => (
                  <div key={index} className={`bg-gradient-to-br ${course.bgColor} rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <span className="text-white text-lg font-bold">{course.provider.charAt(0)}</span>
                      </div>
                      <span className={`px-3 py-1 bg-gradient-to-r ${course.color} text-white rounded-full text-xs font-semibold`}>
                        {course.type}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">{course.course}</h4>
                    <p className="text-gray-700 mb-3 font-['Inter']">{course.provider}</p>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="TrendingUp" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{course.level}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Award" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">Certificate: {course.certificate}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${course.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                      onClick={() => {
                        // Open MNC learning platforms
                        const providerUrls = {
                          'Google': 'https://developers.google.com/machine-learning/crash-course',
                          'Microsoft': 'https://learn.microsoft.com/en-us/training/',
                          'Amazon': 'https://aws.amazon.com/training/',
                          'IBM': 'https://www.ibm.com/training/',
                          'Meta': 'https://www.meta.com/developers/',
                          'Cisco': 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications.html'
                        };
                        const url = providerUrls[course.provider] || 'https://www.coursera.org/';
                        window.open(url, '_blank');
                      }}
                    >
                      Enroll Free
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tamil Nadu Government Courses */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 font-['Poppins'] flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full mr-4"></span>
                Tamil Nadu Government Courses 🏛️
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    provider: 'TNSDC',
                    course: 'Digital Marketing',
                    duration: '3 months',
                    level: 'Beginner',
                    type: 'Non-Technical',
                    description: 'Learn digital marketing strategies and tools',
                    color: 'from-yellow-500 to-orange-600',
                    bgColor: 'from-yellow-50 to-orange-100',
                    certificate: 'Yes',
                    stipend: '₹2,000/month'
                  },
                  {
                    provider: 'TNSDC',
                    course: 'Data Entry & Office Management',
                    duration: '2 months',
                    level: 'Beginner',
                    type: 'Non-Technical',
                    description: 'Office skills and data management',
                    color: 'from-green-500 to-teal-600',
                    bgColor: 'from-green-50 to-teal-100',
                    certificate: 'Yes',
                    stipend: '₹1,500/month'
                  },
                  {
                    provider: 'TNSDC',
                    course: 'Web Development',
                    duration: '6 months',
                    level: 'Intermediate',
                    type: 'Technical',
                    description: 'Full-stack web development with modern technologies',
                    color: 'from-blue-500 to-indigo-600',
                    bgColor: 'from-blue-50 to-indigo-100',
                    certificate: 'Yes',
                    stipend: '₹3,000/month'
                  },
                  {
                    provider: 'TNSDC',
                    course: 'Mobile App Development',
                    duration: '4 months',
                    level: 'Intermediate',
                    type: 'Technical',
                    description: 'Android and iOS app development',
                    color: 'from-purple-500 to-pink-600',
                    bgColor: 'from-purple-50 to-pink-100',
                    certificate: 'Yes',
                    stipend: '₹2,500/month'
                  },
                  {
                    provider: 'TNSDC',
                    course: 'Cybersecurity',
                    duration: '5 months',
                    level: 'Advanced',
                    type: 'Technical',
                    description: 'Cybersecurity fundamentals and ethical hacking',
                    color: 'from-red-500 to-red-600',
                    bgColor: 'from-red-50 to-red-100',
                    certificate: 'Yes',
                    stipend: '₹4,000/month'
                  },
                  {
                    provider: 'TNSDC',
                    course: 'Entrepreneurship & Business',
                    duration: '3 months',
                    level: 'Beginner',
                    type: 'Non-Technical',
                    description: 'Start your own business and learn management',
                    color: 'from-indigo-500 to-purple-600',
                    bgColor: 'from-indigo-50 to-purple-100',
                    certificate: 'Yes',
                    stipend: '₹2,000/month'
                  }
                ].map((course, index) => (
                  <div key={index} className={`bg-gradient-to-br ${course.bgColor} rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <span className="text-white text-lg font-bold">TN</span>
                      </div>
                      <span className={`px-3 py-1 bg-gradient-to-r ${course.color} text-white rounded-full text-xs font-semibold`}>
                        {course.type}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">{course.course}</h4>
                    <p className="text-gray-700 mb-3 font-['Inter']">{course.provider}</p>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="TrendingUp" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">{course.level}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="DollarSign" size={16} color="#6B7280" />
                        <span className="text-sm font-semibold text-gray-700">{course.stipend}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Award" size={16} color="#6B7280" />
                        <span className="text-sm text-gray-600">Certificate: {course.certificate}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${course.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                      onClick={() => {
                        // Open Tamil Nadu government course portal
                        window.open('https://naanmudhalvan.tn.gov.in/', '_blank');
                      }}
                    >
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="py-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4 font-['Poppins']">
                Profile Settings 🐉
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-['Inter']">Manage your profile information and upload your resume</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Overview */}
              <div className="lg:col-span-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-white text-3xl font-bold">D</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-['Poppins']">{userProfile.name}</h3>
                    <p className="text-gray-600 mb-4">{userProfile.currentRole}</p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Icon name="MapPin" size={16} />
                      <span>{userProfile.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="Mail" size={18} color="#6B7280" />
                      <span className="text-sm text-gray-600">{userProfile.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Phone" size={18} color="#6B7280" />
                      <span className="text-sm text-gray-600">{userProfile.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="GraduationCap" size={18} color="#6B7280" />
                      <span className="text-sm text-gray-600">{userProfile.university}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profile Edit Form */}
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-['Poppins']">Edit Profile Information</h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Current Role</label>
                        <input
                          type="text"
                          value={userProfile.currentRole}
                          onChange={(e) => setUserProfile({...userProfile, currentRole: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">University</label>
                        <input
                          type="text"
                          value={userProfile.university}
                          onChange={(e) => setUserProfile({...userProfile, university: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          value={userProfile.location}
                          onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                      <textarea
                        value={userProfile.bio}
                        onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <Icon name="Save" size={20} className="mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </div>
                
                {/* Resume Upload Section */}
                <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-['Poppins']">Resume Management</h3>
                  
                  {userProfile.resume ? (
                    <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
                        <Icon name="FileText" size={24} color="white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-gray-900">{userProfile.resume.name}</p>
                        <p className="text-sm text-gray-600">
                          {(userProfile.resume.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button 
                        onClick={() => setUserProfile({...userProfile, resume: null})}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Icon name="X" size={20} />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-purple-300 rounded-2xl p-8 text-center hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon name="Upload" size={32} color="white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Resume</h4>
                      <p className="text-gray-600 mb-4">Upload your resume to get AI-powered analysis and optimization</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setUserProfile({...userProfile, resume: e.target.files[0]})}
                        className="hidden"
                        id="profile-resume-upload"
                      />
                      <label htmlFor="profile-resume-upload">
                        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                          <Icon name="FileText" size={20} className="mr-2" />
                          Choose File
                        </Button>
                      </label>
                      <p className="text-gray-500 mt-3 text-sm">Supports PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 animate-fade-in">
      <Header isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed} userProfile={userProfile} />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userProfile={userProfile}
        onClose={() => setIsSidebarCollapsed(true)}
      />
      
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-0' : 'ml-0 md:ml-64'} pt-16 pb-20 md:pb-0 animate-page-enter`}>
        <div className="min-h-screen flex justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {renderTabContent()}
          </div>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt isSidebarCollapsed={isSidebarCollapsed} />

      {/* Floating AI chatbot on the right side */}
      <AIAvatarChat />
    </div>
  );
};

export default App;
