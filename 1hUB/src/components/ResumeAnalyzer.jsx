import React, { useState } from 'react';
import Icon from './Icon';
import Button from './Button';

const ResumeAnalyzer = ({ onAnalysisComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const mockAnalysis = {
        overallScore: 78,
        strengths: [
          "Strong technical skills in React and JavaScript",
          "Good project experience with real-world applications",
          "Clear educational background in Computer Science"
        ],
        improvements: [
          "Add more quantifiable achievements with metrics",
          "Include relevant certifications or courses",
          "Optimize keywords for ATS systems",
          "Add a professional summary section"
        ],
        skillGaps: [
          { skill: "Cloud Computing (AWS/Azure)", priority: "High", demand: "92%" },
          { skill: "System Design", priority: "Medium", demand: "78%" },
          { skill: "DevOps Tools", priority: "Medium", demand: "65%" }
        ],
        atsScore: 65,
        recommendations: [
          "Consider adding AWS certification to boost cloud skills",
          "Include more action verbs in experience descriptions",
          "Add a skills section with relevant technologies"
        ]
      };
      
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
      onAnalysisComplete(mockAnalysis);
    }, 3000);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setUploadedFile(null);
  };

  if (analysisResult) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Resume Analysis Results</h3>
            <p className="text-gray-600 mt-1">AI-powered insights and recommendations</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetAnalysis}
            className="border-gray-300 hover:bg-gray-50 rounded-lg px-4 py-2"
          >
            <Icon name="RefreshCw" size={16} className="mr-2" />
            New Analysis
          </Button>
        </div>
        
        {/* Overall Score */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Icon name="Star" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">Overall Score</span>
              </div>
              <span className="text-3xl font-bold text-blue-600">{analysisResult?.overallScore}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${analysisResult?.overallScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-blue-700 mt-2">Based on content quality and formatting</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Icon name="Bot" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">ATS Compatibility</span>
              </div>
              <span className="text-3xl font-bold text-purple-600">{analysisResult?.atsScore}%</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${analysisResult?.atsScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-purple-700 mt-2">Applicant Tracking System compatibility</p>
          </div>
        </div>
        
        {/* Strengths and Improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Icon name="CheckCircle" size={20} className="mr-3 text-green-600" />
              Strengths
            </h4>
            <div className="space-y-3">
              {analysisResult?.strengths?.map((strength, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Icon name="AlertCircle" size={20} className="mr-3 text-orange-600" />
              Areas for Improvement
            </h4>
            <div className="space-y-3">
              {analysisResult?.improvements?.map((improvement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{improvement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Skill Gaps */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon name="Target" size={20} className="mr-3 text-blue-600" />
            Skill Gap Analysis
          </h4>
          <div className="space-y-4">
            {analysisResult?.skillGaps?.map((gap, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{gap?.skill}</p>
                  <p className="text-sm text-gray-600">Market Demand: {gap?.demand}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  gap?.priority === 'High' 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                }`}>
                  {gap?.priority} Priority
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon name="Lightbulb" size={20} className="mr-3 text-yellow-600" />
            AI Recommendations
          </h4>
          <div className="space-y-3">
            {analysisResult?.recommendations?.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Icon name="ArrowRight" size={16} className="mt-1 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 min-h-screen">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4 font-['Poppins']">
          Resume Analysis 🚀
        </h3>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto font-['Inter']">Upload your resume for AI-powered analysis and optimization</p>
      </div>
      
      {!uploadedFile ? (
        <div className="max-w-5xl mx-auto">
          <div className="border-2 border-dashed border-purple-300 rounded-3xl p-16 text-center bg-white/80 backdrop-blur-sm hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Icon name="Upload" size={48} color="white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4 font-['Poppins']">Upload Your Resume</h4>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
              Get detailed analysis with ATS optimization, skill gap insights, and personalized recommendations
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <label htmlFor="resume-upload">
              <Button 
                variant="default" 
                className="cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Icon name="FileText" size={24} className="mr-3" />
                Choose File
              </Button>
            </label>
            <p className="text-gray-500 mt-6 text-sm">
              Supports PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="FileText" size={32} color="white" />
            </div>
            <div className="flex-1">
              <p className="text-xl font-bold text-gray-900 font-['Poppins']">{uploadedFile?.name}</p>
              <p className="text-gray-600 text-sm">
                {(uploadedFile?.size / 1024 / 1024)?.toFixed(2)} MB
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setUploadedFile(null)}
              className="text-gray-400 hover:text-gray-600 w-12 h-12 rounded-xl"
            >
              <Icon name="X" size={24} />
            </Button>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            loading={isAnalyzing}
            fullWidth
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {isAnalyzing ? 'Analyzing Resume...' : 'Start AI Analysis'}
          </Button>

          {isAnalyzing && (
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-4 text-purple-600">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xl font-bold font-['Poppins']">AI is analyzing your resume...</span>
              </div>
              <p className="text-gray-600 mt-3 text-lg">This may take a few moments</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
