'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { 
  TrendingUp, 
  RefreshCw, 
  ArrowLeft, 
  AlertTriangle,
  Calendar,
  Target,
  BarChart3
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

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // State management
  const [selectedDate, setSelectedDate] = useState(todayIST())
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>(DEFAULT_SYMBOLS)
  const [actualDataDate, setActualDataDate] = useState<string | null>(null)
  const [fallbackAttempted, setFallbackAttempted] = useState(false)

  // Initialize symbols from URL params
  useEffect(() => {
    const symbolsParam = searchParams.get('symbols')
    if (symbolsParam) {
      const symbols = symbolsParam.split(',').filter(Boolean)
      if (symbols.length > 0) {
        setSelectedSymbols(symbols)
      }
    }
  }, [searchParams])

  // Update URL when symbols change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedSymbols.length > 0) {
      params.set('symbols', selectedSymbols.join(','))
    } else {
      params.delete('symbols')
    }
    router.replace(`/dashboard?${params.toString()}`, { scroll: false })
  }, [selectedSymbols, router, searchParams])

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
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">RailPulse Dashboard</h1>
                  <p className="text-sm text-gray-600">Daily Market Insights</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={metricsLoading || recommendationsLoading}
              className="btn-secondary flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${(metricsLoading || recommendationsLoading) ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date
              </label>
              <DatePicker
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                disabled={metricsLoading}
              />
            </div>
            <div className="flex-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4 inline mr-1" />
                Symbols ({selectedSymbols.length} selected)
              </label>
              <SymbolsSelect
                selectedSymbols={selectedSymbols}
                onSelectionChange={setSelectedSymbols}
                disabled={metricsLoading}
              />
            </div>
          </div>

          {/* Fallback Notice */}
          {isShowingFallbackData && displayDate && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <p className="text-amber-800 text-sm">
                  <strong>Note:</strong> No data available for {selectedDate ? getDaysAgoText(selectedDate) : 'today'}. 
                  Showing data from {getDaysAgoText(displayDate)} instead.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="Portfolio Return"
            value={`${kpiData.portfolioReturn > 0 ? '+' : ''}${kpiData.portfolioReturn.toFixed(2)}%`}
            change={kpiData.portfolioReturn}
            changeType={kpiData.portfolioReturn > 0 ? 'positive' : kpiData.portfolioReturn < 0 ? 'negative' : 'neutral'}
            icon="dollar"
            loading={metricsLoading}
          />
          <KPICard
            title="Top Gainer"
            value={kpiData.topGainer.symbol}
            change={kpiData.topGainer.return}
            changeType="positive"
            icon="trending-up"
            loading={metricsLoading}
          />
          <KPICard
            title="Top Loser"
            value={kpiData.topLoser.symbol}
            change={kpiData.topLoser.return}
            changeType="negative"
            icon="trending-down"
            loading={metricsLoading}
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <TrendChart
            data={chartData}
            type="price"
            loading={metricsLoading}
          />
          <div className="xl:row-span-2">
            <AnalystPanel
              recommendations={recommendationsData || null}
              loading={recommendationsLoading}
              error={recommendationsError ? (recommendationsError.message || 'Unknown error') : null}
            />
          </div>
        </div>

        {/* Metrics Table */}
        <div className="mb-8">
          <MetricsTable
            prices={metricsData?.prices || []}
            metrics={metricsData?.metrics || []}
            loading={metricsLoading}
          />
        </div>

        {/* Admin Actions */}
        <AdminActions
          selectedDate={selectedDate}
          onDataRefresh={handleDataRefresh}
        />
      </main>
    </div>
  )
}
