'use client'

import { Brain, Lightbulb, AlertCircle } from 'lucide-react'
import { RecommendationsResponse } from '@/lib/types'
import { formatDisplayDate, getDaysAgoText } from '@/lib/date'

interface AnalystPanelProps {
  recommendations: RecommendationsResponse | null
  loading?: boolean
  error?: string | null
}

export default function AnalystPanel({ recommendations, loading = false, error }: AnalystPanelProps) {
  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <div className="skeleton w-6 h-6 rounded"></div>
            <div className="skeleton h-6 w-32"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="skeleton h-20 w-full"></div>
          <div className="space-y-2">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-danger-50 border border-danger-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-danger-600 flex-shrink-0" />
          <div>
            <p className="text-danger-800 font-medium">Unable to load recommendations</p>
            <p className="text-danger-600 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!recommendations) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
          </div>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No analysis available for this date</p>
        </div>
      </div>
    )
  }

  const formatRecommendations = () => {
    if (Array.isArray(recommendations.recommendations)) {
      if (typeof recommendations.recommendations[0] === 'string') {
        return recommendations.recommendations as string[]
      } else {
        return (recommendations.recommendations as { title: string; action: string }[]).map(
          rec => `${rec.title}: ${rec.action}`
        )
      }
    }
    return []
  }

  const formattedRecommendations = formatRecommendations()

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
          </div>
          <div className="text-sm text-gray-500">
            {getDaysAgoText(recommendations.date)}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Market Summary
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-800 leading-relaxed">{recommendations.summary}</p>
          </div>
        </div>

        {/* Recommendations Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Recommendations ({formattedRecommendations.length})
          </h4>
          <div className="space-y-3">
            {formattedRecommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-primary-50 border border-primary-100 rounded-lg"
              >
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-primary-900 leading-relaxed">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metadata */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Analysis Date: {formatDisplayDate(recommendations.date)}</span>
            <span>Generated: {formatDisplayDate(recommendations.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
