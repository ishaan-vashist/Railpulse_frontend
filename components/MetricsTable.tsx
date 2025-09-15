'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { DailyPrice, DailyMetric } from '@/lib/types'

interface MetricsTableProps {
  prices: DailyPrice[]
  metrics: DailyMetric[]
  loading?: boolean
}

export default function MetricsTable({ prices, metrics, loading = false }: MetricsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const formatVolume = (value: number) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)}B`
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}M`
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(1)}K`
    }
    return value.toLocaleString()
  }

  const getReturnIcon = (returnPct: number) => {
    if (returnPct > 0) {
      return <TrendingUp className="w-4 h-4 text-success-600" />
    } else if (returnPct < 0) {
      return <TrendingDown className="w-4 h-4 text-danger-600" />
    }
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getReturnColor = (returnPct: number) => {
    if (returnPct > 0) return 'text-success-600'
    if (returnPct < 0) return 'text-danger-600'
    return 'text-gray-600'
  }

  const combineData = () => {
    return prices.map(price => {
      const metric = metrics.find(m => m.symbol === price.symbol)
      return { price, metric }
    })
  }

  const combinedData = combineData()

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="skeleton h-6 w-32"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {['Symbol', 'Open', 'High', 'Low', 'Close', 'Volume', 'Return %'].map((header) => (
                  <th key={header} className="text-left py-3 px-4">
                    <div className="skeleton h-4 w-16"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  {[...Array(7)].map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="skeleton h-4 w-12"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-semibold text-gray-900">Market Metrics</h3>
      </div>

      {combinedData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No market data available</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Symbol</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Open</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">High</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Low</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Close</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Volume</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Return %</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.map(({ price, metric }) => (
                <tr key={price.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{price.symbol}</div>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {formatCurrency(price.open)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {formatCurrency(price.high)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {formatCurrency(price.low)}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">
                    {formatCurrency(price.close)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {formatVolume(price.volume)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {metric ? (
                      <div className={`flex items-center justify-end gap-1 ${getReturnColor(metric.return_pct)}`}>
                        {getReturnIcon(metric.return_pct)}
                        <span className="font-medium">
                          {formatPercent(metric.return_pct)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
