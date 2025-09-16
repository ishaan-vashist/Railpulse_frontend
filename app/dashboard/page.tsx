'use client'

import React, { useState, useEffect, useMemo, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { 
  TrendingUp, 
  TrendingDown,
  RefreshCw, 
  ArrowLeft, 
  AlertTriangle,
  Calendar,
  Target,
  BarChart3,
  Brain
} from 'lucide-react'

import KPICard from '@/components/KPICard'
import SymbolsSelect from '@/components/SymbolsSelect'
import DatePicker from '@/components/DatePicker'
import TrendChart from '@/components/TrendChart'
import MetricsTable from '@/components/MetricsTable'
import AnalystPanel from '@/components/AnalystPanel'
import AdminActions from '@/components/AdminActions'

import { fetchMetrics, fetchRecommendations } from '@/lib/api'
import { todayIST, getFallbackDates, getDaysAgoText, isToday } from '@/lib/date'
import { DEFAULT_SYMBOLS, ChartDataPoint, KPIData } from '@/lib/types'

// Client components

// Component that uses useSearchParams
function SymbolsManager({ 
  onSymbolsInitialized, 
  selectedSymbols 
}: { 
  onSymbolsInitialized: (symbols: string[]) => void,
  selectedSymbols: string[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initializedRef = React.useRef(false)
  
  // Initialize symbols from URL params only once
  useEffect(() => {
    const symbolsParam = searchParams.get('symbols')
    if (symbolsParam && !initializedRef.current) {
      const symbols = symbolsParam.split(',').filter(Boolean)
      if (symbols.length > 0 && JSON.stringify(symbols) !== JSON.stringify(selectedSymbols)) {
        onSymbolsInitialized(symbols)
        initializedRef.current = true;
      }
    } else if (!initializedRef.current) {
      // Mark as initialized even if no symbols in URL
      initializedRef.current = true;
    }
  }, [searchParams, onSymbolsInitialized, selectedSymbols])

  // Update URL when symbols change
  useEffect(() => {
    // Skip the initial render to avoid an unnecessary URL update
    if (!initializedRef.current) return;
    
    const params = new URLSearchParams(searchParams.toString())
    if (selectedSymbols.length > 0) {
      params.set('symbols', selectedSymbols.join(','))
    } else {
      params.delete('symbols')
    }
    router.replace(`/dashboard?${params.toString()}`, { scroll: false })
  }, [selectedSymbols, router, searchParams])
  
  return null
}

// Client component for time display to avoid hydration mismatch
function TimeDisplay() {
  const [time, setTime] = useState<string>('')
  
  useEffect(() => {
    // Only set the time on the client side
    setTime(new Date().toLocaleTimeString('en-US'))
    
    // Optional: Update time every minute
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US'))
    }, 60000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Don't render anything until client-side
  if (!time) return null
  
  return <span>{time}</span>
}

export default function DashboardPage() {
  // State management
  const [selectedDate, setSelectedDate] = useState(todayIST())
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>(DEFAULT_SYMBOLS)
  const [actualDataDate, setActualDataDate] = useState<string | null>(null)
  const [fallbackAttempted, setFallbackAttempted] = useState(false)
  
  const handleSymbolsInitialized = (symbols: string[]) => {
    // Only update if the symbols are actually different
    if (JSON.stringify(symbols) !== JSON.stringify(selectedSymbols)) {
      setSelectedSymbols(symbols)
    }
  }

  // Data fetching with fallback logic
  const { data: metricsData, error: metricsError, isLoading: metricsLoading, mutate: mutateMetrics } = useSWR(
    ['metrics', selectedDate, selectedSymbols.join(',')],
    async () => {
      // Try the selected date first
      try {
        const data = await fetchMetrics(selectedDate, selectedSymbols)
        setActualDataDate(selectedDate)
        setFallbackAttempted(false)
        return data
      } catch (error: any) {
        // If it's today and no data, try fallback dates
        if (isToday(selectedDate) && !fallbackAttempted) {
          const fallbackDates = getFallbackDates().slice(1) // Skip today, already tried
          
          for (const fallbackDate of fallbackDates) {
            try {
              const data = await fetchMetrics(fallbackDate, selectedSymbols)
              if (data && data.prices && data.prices.length > 0) {
                setActualDataDate(fallbackDate)
                setFallbackAttempted(true)
                toast.success(
                  `No data for today. Showing data from ${getDaysAgoText(fallbackDate)}.`,
                  { duration: 6000 }
                )
                return data
              }
            } catch {
              continue
            }
          }
        }
        throw error
      }
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 5 * 60 * 1000, // 5 minutes
      onError: (error) => {
        toast.error(`Failed to load market data: ${error.message}`)
      }
    }
  )

  const { data: recommendationsData, error: recommendationsError, isLoading: recommendationsLoading, mutate: mutateRecommendations } = useSWR(
    ['recommendations', actualDataDate || selectedDate],
    () => {
      try {
        return fetchRecommendations(actualDataDate || selectedDate)
      } catch (error: any) {
        console.warn('Failed to load recommendations:', error?.message || 'Unknown error')
        throw error
      }
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 10 * 60 * 1000, // 10 minutes
      onError: (error) => {
        console.warn('Failed to load recommendations:', error?.message || 'Unknown error')
      }
    }
  )

  // Calculate KPI data
  const kpiData: KPIData = useMemo(() => {
    if (!metricsData?.metrics || metricsData.metrics.length === 0) {
      return {
        portfolioReturn: 0,
        topGainer: { symbol: '—', return: 0 },
        topLoser: { symbol: '—', return: 0 }
      }
    }

    const metrics = metricsData.metrics
    const portfolioReturn = metrics.reduce((sum, m) => sum + (m.return_pct || 0), 0) / metrics.length
    
    const sortedByReturn = [...metrics].sort((a, b) => (b.return_pct || 0) - (a.return_pct || 0))
    const topGainer = sortedByReturn[0]
    const topLoser = sortedByReturn[sortedByReturn.length - 1]

    return {
      portfolioReturn,
      topGainer: { symbol: topGainer.symbol, return: topGainer.return_pct || 0 },
      topLoser: { symbol: topLoser.symbol, return: topLoser.return_pct || 0 }
    }
  }, [metricsData])

  // Generate chart data (mock 30-day trend for now)
  const chartData: ChartDataPoint[] = useMemo(() => {
    if (!metricsData?.prices || metricsData.prices.length === 0) return []
    
    // For demo purposes, generate mock historical data
    // In a real app, you'd fetch historical data from the API
    const mockData: ChartDataPoint[] = []
    const today = new Date(actualDataDate || selectedDate)
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      // Mock price trend with some volatility
      const basePrice = 100
      const trend = (30 - i) * 0.5 // Slight upward trend
      const volatility = (Math.random() - 0.5) * 10
      const price = basePrice + trend + volatility
      
      mockData.push({
        date: date.toISOString().split('T')[0],
        value: price
      })
    }
    
    return mockData
  }, [metricsData, actualDataDate, selectedDate])

  const handleRefresh = () => {
    mutateMetrics()
    mutateRecommendations()
    toast.success('Data refreshed!')
  }

  const handleDataRefresh = () => {
    // Reset fallback state when admin actions complete
    setFallbackAttempted(false)
    setActualDataDate(null)
    handleRefresh()
  }

  const displayDate = actualDataDate || selectedDate
  const isShowingFallbackData = actualDataDate && actualDataDate !== selectedDate

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Home
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-md">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">RailPulse Dashboard</h1>
                  <p className="text-sm text-gray-600">Daily Market Insights</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Live Data</span>
              </div>
              <button
                onClick={handleRefresh}
                disabled={metricsLoading || recommendationsLoading}
                className="btn-primary flex items-center gap-2 shadow-sm hover:shadow transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${(metricsLoading || recommendationsLoading) ? 'animate-spin' : ''}`} />
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div>Loading symbols...</div>}>
          <SymbolsManager 
            onSymbolsInitialized={handleSymbolsInitialized}
            selectedSymbols={selectedSymbols}
          />
        </Suspense>
        {/* Dashboard Overview */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Market Overview</h2>
          <p className="text-gray-600">Analyze market trends and make informed decisions with real-time data</p>
        </div>
        
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Data Controls</h3>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                  Select Date
                </label>
                <div className="bg-gray-50 p-1 rounded-lg">
                  <DatePicker
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    disabled={metricsLoading}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Currently showing: <span className="font-medium">{displayDate}</span>
                </div>
              </div>
              
              <div className="flex-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Target className="w-4 h-4 mr-2 text-primary-600" />
                  Select Symbols
                </label>
                <div className="bg-gray-50 p-1 rounded-lg">
                  <SymbolsSelect
                    selectedSymbols={selectedSymbols}
                    onSelectionChange={setSelectedSymbols}
                    disabled={metricsLoading}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <span className="font-medium">{selectedSymbols.length}</span> symbols selected
                </div>
              </div>
            </div>

            {/* Fallback Notice */}
            {isShowingFallbackData && displayDate && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-800">Using fallback data</h4>
                    <p className="text-amber-700 text-sm mt-0.5">
                      No data available for {selectedDate ? getDaysAgoText(selectedDate) : 'today'}. 
                      Showing data from {getDaysAgoText(displayDate)} instead.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Performance Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-primary-50 to-white">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">Portfolio Return</h4>
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4">
                {metricsLoading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {`${kpiData.portfolioReturn > 0 ? '+' : ''}${kpiData.portfolioReturn.toFixed(2)}%`}
                    </div>
                    <div className={`flex items-center text-sm ${kpiData.portfolioReturn > 0 ? 'text-success-600' : kpiData.portfolioReturn < 0 ? 'text-danger-600' : 'text-gray-500'}`}>
                      {kpiData.portfolioReturn > 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : kpiData.portfolioReturn < 0 ? (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      ) : null}
                      <span>vs. previous period</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-success-50 to-white">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">Top Gainer</h4>
                  <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-success-600" />
                  </div>
                </div>
              </div>
              <div className="px-6 py-4">
                {metricsLoading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {kpiData.topGainer.symbol}
                    </div>
                    <div className="flex items-center text-sm text-success-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>{typeof kpiData.topGainer.return === 'number' ? `+${kpiData.topGainer.return.toFixed(2)}%` : '0.00%'}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-danger-50 to-white">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">Top Loser</h4>
                  <div className="w-8 h-8 bg-danger-100 rounded-lg flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-danger-600" />
                  </div>
                </div>
              </div>
              <div className="px-6 py-4">
                {metricsLoading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {kpiData.topLoser.symbol}
                    </div>
                    <div className="flex items-center text-sm text-danger-600">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      <span>{typeof kpiData.topLoser.return === 'number' ? `${kpiData.topLoser.return.toFixed(2)}%` : '0.00%'}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Data Visualization Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Market Analysis</h3>
            <div className="flex items-center gap-3">
              <div className="text-xs font-medium text-gray-500 hidden md:block">
                Last updated: <TimeDisplay />
              </div>
              <button 
                onClick={handleRefresh} 
                className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Price Chart */}
            <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary-600" />
                    Price Trends
                  </h4>
                  <div className="text-xs text-gray-500">
                    {displayDate}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <TrendChart
                  data={chartData}
                  type="price"
                  loading={metricsLoading}
                />
              </div>
            </div>
            
            {/* Analyst Panel */}
            <div className="xl:row-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full">
                <div className="border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-indigo-50 to-white">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-700 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-indigo-600" />
                      AI Analysis
                    </h4>
                    {recommendationsLoading && (
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Analyzing...
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <AnalystPanel
                    recommendations={recommendationsData || null}
                    loading={recommendationsLoading}
                    error={recommendationsError ? (recommendationsError.message || 'Unknown error') : null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Table Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Metrics</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-700 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-gray-600" />
                  Detailed Metrics
                </h4>
                <div className="text-xs font-medium text-gray-500">
                  {selectedSymbols.length} symbols • {displayDate}
                </div>
              </div>
            </div>
            <div>
              <MetricsTable
                prices={metricsData?.prices || []}
                metrics={metricsData?.metrics || []}
                loading={metricsLoading}
              />
            </div>
          </div>
        </div>

        {/* Admin Actions Section */}
        <div className="mb-8 bg-gray-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Administrative Controls</h3>
          <AdminActions
            selectedDate={selectedDate}
            onDataRefresh={handleDataRefresh}
          />
        </div>
      </main>
    </div>
  )
}
