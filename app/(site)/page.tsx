import Link from 'next/link'
import { ArrowRight, TrendingUp, BarChart3, Brain, Shield, Zap, Globe, ChevronDown, Check, Users } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Header */}
      <header className="relative z-10 sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">RailPulse</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary-600 font-medium">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-primary-600 font-medium">Benefits</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary-600 font-medium">Testimonials</a>
            </div>
            <Link 
              href="/dashboard"
              className="btn-primary flex items-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 py-24">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-6">
              AI-Powered Market Analysis
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-gradient">RailPulse</span>: Smarter Trading Decisions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Advanced market analysis and AI-driven recommendations for informed trading. 
              Get real-time insights, technical indicators, and personalized strategies 
              to stay ahead in today's dynamic markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-start justify-center">
              <Link 
                href="/dashboard"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                Start Analyzing
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#features" className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2">
                Explore Features
                <ChevronDown className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-1 text-gray-500">
              <Check className="w-5 h-5 text-primary-600" />
              <span>Real-time market data</span>
              <span className="mx-2">•</span>
              <Check className="w-5 h-5 text-primary-600" />
              <span>AI recommendations</span>
              <span className="mx-2">•</span>
              <Check className="w-5 h-5 text-primary-600" />
              <span>No credit card</span>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="bg-gray-800 px-6 py-4 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm">RailPulse Dashboard</div>
              </div>
              <div className="p-4">
                <div className="h-64 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                    <div className="text-lg font-medium text-primary-800">Interactive Market Dashboard</div>
                    <div className="text-sm text-primary-600">Real-time analytics & insights</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary-100 rounded-full filter blur-3xl opacity-70 z-0"></div>
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-success-100 rounded-full filter blur-3xl opacity-70 z-0"></div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-24 scroll-mt-20">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-success-100 text-success-800 rounded-full text-sm font-medium mb-6">
              Powerful Features
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need for smarter trading
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and insights to make informed investment decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card border-t-4 border-t-primary-500 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <BarChart3 className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Data</h3>
                  <p className="text-gray-600">
                    Live market data with OHLCV prices, volume analysis, and technical indicators 
                    updated throughout the trading day.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center text-primary-600 font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>

            <div className="card border-t-4 border-t-success-500 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mr-4">
                  <Brain className="w-6 h-6 text-success-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Recommendations</h3>
                  <p className="text-gray-600">
                    Machine learning-powered analysis provides personalized trading recommendations 
                    based on market trends and your portfolio.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center text-success-600 font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>

            <div className="card border-t-4 border-t-danger-500 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-danger-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Analysis</h3>
                  <p className="text-gray-600">
                    Advanced technical indicators including moving averages, RSI, volatility metrics, 
                    and support/resistance levels.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center text-danger-600 font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>

            <div className="card border-t-4 border-t-purple-500 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Risk Management</h3>
                  <p className="text-gray-600">
                    Portfolio risk assessment with volatility analysis and position sizing 
                    recommendations to protect your investments.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center text-purple-600 font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>

            <div className="card border-t-4 border-t-yellow-500 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Performance</h3>
                  <p className="text-gray-600">
                    Lightning-fast data processing and analysis with real-time updates 
                    and minimal latency for time-sensitive decisions.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center text-yellow-600 font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>

            <div className="card border-t-4 border-t-indigo-500 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Markets</h3>
                  <p className="text-gray-600">
                    Coverage of major global markets including US equities, cryptocurrencies, 
                    and international indices for diversified analysis.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center text-indigo-600 font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div id="benefits" className="py-24 bg-gray-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-6">
                Why Choose RailPulse
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Benefits that make a difference
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our platform is designed to give you the edge in today's competitive markets
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Increased Profitability</h3>
                <p className="text-center text-gray-600">
                  Make more informed decisions with AI-powered insights that identify profitable opportunities before others.
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-success-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Reduced Risk</h3>
                <p className="text-center text-gray-600">
                  Advanced risk management tools help protect your investments during market volatility.
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Save Time</h3>
                <p className="text-center text-gray-600">
                  Automate your analysis process and get instant insights instead of spending hours on research.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div id="testimonials" className="py-24 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-6">
                Testimonials
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Trusted by traders worldwide
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See what our users have to say about their experience with RailPulse
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Alex Thompson</h4>
                    <p className="text-sm text-gray-600">Day Trader</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "RailPulse has completely transformed my trading strategy. The AI recommendations have helped me identify opportunities I would have otherwise missed."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">Portfolio Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The risk management tools have been invaluable for my clients' portfolios. I can confidently make decisions backed by solid data and analysis."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                    <p className="text-sm text-gray-600">Crypto Investor</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The global market coverage is exceptional. I can track crypto trends alongside traditional markets all in one place with powerful analytics."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-24 mb-16 bg-gradient-to-r from-primary-600 to-primary-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to transform your trading strategy?
            </h2>
            <p className="text-xl mb-10 text-primary-100">
              Join thousands of traders who rely on RailPulse for market insights and recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard"
                className="bg-white text-primary-700 hover:bg-gray-100 font-medium py-4 px-8 rounded-lg transition-all duration-200 inline-flex items-center gap-2 text-lg shadow-lg hover:shadow-xl"
              >
                Access Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="#features"
                className="bg-primary-700 text-white border border-primary-400 hover:bg-primary-800 font-medium py-4 px-8 rounded-lg transition-all duration-200 inline-flex items-center gap-2 text-lg"
              >
                Learn More
                <ChevronDown className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">RailPulse</span>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering traders with AI-driven market insights and advanced analytics.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Home</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-primary-400 transition-colors">Features</a></li>
                <li><a href="#benefits" className="text-gray-400 hover:text-primary-400 transition-colors">Benefits</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-primary-400 transition-colors">Testimonials</a></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-primary-400 transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and insights.</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500 w-full" />
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 RailPulse. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
