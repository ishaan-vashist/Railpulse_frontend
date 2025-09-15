import Link from 'next/link'
import { ArrowRight, TrendingUp, BarChart3, Brain, Shield, Zap, Globe } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Header */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">RailPulse</span>
            </div>
            <Link 
              href="/dashboard"
              className="btn-primary"
            >
              Go to Dashboard
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-gradient">RailPulse</span>
            <br />
            Daily Market Insights
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-powered market analysis and recommendations for informed trading decisions. 
            Get real-time insights, technical indicators, and personalized recommendations 
            to stay ahead of the market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center gap-2"
            >
              Start Analyzing
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="btn-secondary text-lg px-8 py-3">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need for market analysis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and insights to make informed investment decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-glow transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Data</h3>
              <p className="text-gray-600">
                Live market data with OHLCV prices, volume analysis, and technical indicators 
                updated throughout the trading day.
              </p>
            </div>

            <div className="card text-center hover:shadow-glow transition-shadow duration-300">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Recommendations</h3>
              <p className="text-gray-600">
                Machine learning-powered analysis provides personalized trading recommendations 
                based on market trends and your portfolio.
              </p>
            </div>

            <div className="card text-center hover:shadow-glow transition-shadow duration-300">
              <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-danger-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Analysis</h3>
              <p className="text-gray-600">
                Advanced technical indicators including moving averages, RSI, volatility metrics, 
                and support/resistance levels.
              </p>
            </div>

            <div className="card text-center hover:shadow-glow transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Risk Management</h3>
              <p className="text-gray-600">
                Portfolio risk assessment with volatility analysis and position sizing 
                recommendations to protect your investments.
              </p>
            </div>

            <div className="card text-center hover:shadow-glow transition-shadow duration-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Performance</h3>
              <p className="text-gray-600">
                Lightning-fast data processing and analysis with real-time updates 
                and minimal latency for time-sensitive decisions.
              </p>
            </div>

            <div className="card text-center hover:shadow-glow transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Markets</h3>
              <p className="text-gray-600">
                Coverage of major global markets including US equities, cryptocurrencies, 
                and international indices for diversified analysis.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <div className="card text-center max-w-4xl mx-auto bg-gradient-to-r from-primary-600 to-primary-700 text-white border-0">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your trading strategy?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands of traders who rely on RailPulse for market insights and recommendations.
            </p>
            <Link 
              href="/dashboard"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center gap-2 text-lg"
            >
              Access Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">RailPulse</span>
            </div>
            <p className="text-gray-600">
              © 2024 RailPulse. Empowering traders with AI-driven market insights.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
