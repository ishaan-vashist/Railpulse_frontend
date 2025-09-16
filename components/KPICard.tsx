'use client'

import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: 'trending-up' | 'trending-down' | 'dollar'
  loading?: boolean
}

export default function KPICard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  loading = false 
}: KPICardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'trending-up':
        return <TrendingUp className="w-5 h-5" />
      case 'trending-down':
        return <TrendingDown className="w-5 h-5" />
      case 'dollar':
        return <DollarSign className="w-5 h-5" />
      default:
        return null
    }
  }

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success-600'
      case 'negative':
        return 'text-danger-600'
      default:
        return 'text-gray-600'
    }
  }

  const getIconColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success-600 bg-success-100'
      case 'negative':
        return 'text-danger-600 bg-danger-100'
      default:
        return 'text-primary-600 bg-primary-100'
    }
  }

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="skeleton h-4 w-24 mb-2"></div>
            <div className="skeleton h-8 w-16 mb-1"></div>
            <div className="skeleton h-3 w-20"></div>
          </div>
          <div className="skeleton w-10 h-10 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="card hover:shadow-glow transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change !== undefined && (
            <div className={`flex items-center text-sm ${getChangeColor()}`}>
              {changeType === 'positive' && <TrendingUp className="w-3 h-3 mr-1" />}
              {changeType === 'negative' && <TrendingDown className="w-3 h-3 mr-1" />}
              <span>
                {typeof change === 'number' ? `${change > 0 ? '+' : ''}${change.toFixed(2)}` : '0.00'}%
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor()}`}>
            {getIcon()}
          </div>
        )}
      </div>
    </div>
  )
}
