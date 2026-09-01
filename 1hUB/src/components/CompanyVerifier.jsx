import React, { useMemo, useState } from 'react';
import Icon from './Icon';

const DEFAULT_API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_COMPANY_API_BASE) ||
  'http://localhost:5000';

const sentimentStyles = (sentiment) => {
  const s = (sentiment || '').toLowerCase();
  if (s === 'positive') return 'bg-green-100 text-green-800 border-green-200';
  if (s === 'negative') return 'bg-red-100 text-red-800 border-red-200';
  if (s) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-gray-100 text-gray-700 border-gray-200';
};

const CompanyVerifier = () => {
  const apiBase = useMemo(() => DEFAULT_API_BASE, []);
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = companyName.trim();
    if (!name) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`${apiBase}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company_name: name })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      setResult(data);
    } catch (err) {
      setError(
        `${err?.message || 'Failed to verify company.'} (Tip: start the Flask server in \`company/\` on port 5000)`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const analysis = result?.ai_analysis || {};

  return (
    <div className="py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-3 font-['Poppins']">
            Company Profile Verifier
          </h2>
          <p className="text-lg text-gray-700 font-['Inter']">
            Search any company and get a structured overview (about, services, location, and user review sentiment).
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Icon
                name="Search"
                size={18}
                color="#6B7280"
                className="absolute left-4 top-1/2 -translate-y-1/2"
              />
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., OpenAI"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-300 transition"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 hover:-translate-y-0.5'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Icon name={isLoading ? 'LoaderCircle' : 'Sparkles'} size={18} color="white" className={isLoading ? 'animate-spin' : ''} />
                {isLoading ? 'Analyzing…' : 'Verify'}
              </span>
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
              <div className="flex gap-3">
                <Icon name="AlertTriangle" size={18} color="#b91c1c" className="mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Website */}
              <div className="lg:col-span-3 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Icon name="Globe" size={18} color="white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-['Poppins']">Official Website</h3>
                </div>
                {result.website_url ? (
                  <a
                    className="text-purple-700 hover:underline break-all font-semibold"
                    href={result.website_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {result.website_url}
                  </a>
                ) : (
                  <p className="text-gray-600">N/A</p>
                )}
              </div>

              {/* About */}
              <div className="lg:col-span-3 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center">
                    <Icon name="Info" size={18} color="white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-['Poppins']">
                    About {result.company_name || 'Company'}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{analysis.about || 'N/A'}</p>
              </div>

              {/* Services */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Icon name="Boxes" size={18} color="white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 font-['Poppins']">Services</h3>
                </div>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  {Array.isArray(analysis.services) && analysis.services.length > 0 ? (
                    analysis.services.map((s, i) => <li key={`${s}-${i}`}>{s}</li>)
                  ) : (
                    <li>No services listed.</li>
                  )}
                </ul>
              </div>

              {/* Location */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Icon name="MapPin" size={18} color="white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 font-['Poppins']">Location</h3>
                </div>
                <p className="text-gray-700 font-semibold">{analysis.location || 'N/A'}</p>
              </div>

              {/* Reviews */}
              <div className="lg:col-span-1 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                    <Icon name="MessageSquareQuote" size={18} color="white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 font-['Poppins']">User Reviews</h3>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-gray-600 font-medium">Sentiment</span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${sentimentStyles(
                      analysis?.user_reviews?.sentiment
                    )}`}
                  >
                    {analysis?.user_reviews?.sentiment || 'N/A'}
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed text-sm">
                  {analysis?.user_reviews?.summary || 'N/A'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyVerifier;


