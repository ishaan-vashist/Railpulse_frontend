'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { ChartDataPoint } from '@/lib/types'

interface TrendChartProps {
  data: ChartDataPoint[]
  type: 'price' | 'return'
  height?: number
  loading?: boolean
}

export default function TrendChart({ 
  data, 
  type, 
  height = 300,
  loading = false 
}: TrendChartProps) {
  const [chartType, setChartType] = useState<'price' | 'return'>(type)

  const formatValue = (value: number) => {
    if (chartType === 'return') {
      return `${value.toFixed(2)}%`
    }
    return `$${value.toLocaleString()}`
  }

  const formatTooltipValue = (value: number, name: string) => {
    return [formatValue(value), name === 'value' ? (chartType === 'return' ? 'Return' : 'Price') : name]
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getLineColor = () => {
    if (data.length === 0) return '#3b82f6'
    
    const firstValue = data[0]?.value || 0
    const lastValue = data[data.length - 1]?.value || 0
    
    return lastValue >= firstValue ? '#22c55e' : '#ef4444'
  }

  const getTrendInfo = () => {
    if (data.length < 2) return null
    
    const firstValue = data[0]?.value || 0
    const lastValue = data[data.length - 1]?.value || 0
    const change = lastValue - firstValue
    const changePercent = firstValue !== 0 ? (change / firstValue) * 100 : 0
    
    return {
      change,
      changePercent,
      isPositive: change >= 0
    }
  }

  const trendInfo = getTrendInfo()

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div className="skeleton h-6 w-32"></div>
            <div className="skeleton h-8 w-24"></div>
          </div>
        </div>
        <div className="skeleton h-64 w-full"></div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900">
              30-Day Trend
            </h3>
            {trendInfo && (
              <div className={`flex items-center gap-1 text-sm ${trendInfo.isPositive ? 'text-success-600' : 'text-danger-600'}`}>
                {trendInfo.isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>
                  {trendInfo.isPositive ? '+' : ''}{trendInfo.changePercent.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('price')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                chartType === 'price'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Price
            </button>
            <button
              onClick={() => setChartType('return')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                chartType === 'return'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Return
            </button>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No chart data available</p>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={formatValue}
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelFormatter={(label) => formatDate(label)}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={getLineColor()}
              strokeWidth={2}
              dot={{ fill: getLineColor(), strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: getLineColor(), strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
