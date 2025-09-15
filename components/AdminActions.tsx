'use client'

import { useState } from 'react'
import { Play, RefreshCw, Settings, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { runETLPipeline, generateRecommendations, isAdminEnabled } from '@/lib/api'
import { formatAPIDate, todayIST } from '@/lib/date'

interface AdminActionsProps {
  selectedDate: string
  onDataRefresh?: () => void
}

export default function AdminActions({ selectedDate, onDataRefresh }: AdminActionsProps) {
  const [isRunningETL, setIsRunningETL] = useState(false)
  const [isGeneratingRecs, setIsGeneratingRecs] = useState(false)

  if (!isAdminEnabled()) {
    return null
  }

  const handleRunETL = async (forceRefresh: boolean = false) => {
    setIsRunningETL(true)
    
    try {
      const result = await runETLPipeline(forceRefresh)
      
      if (result.success) {
        toast.success(
          `ETL completed successfully! Processed ${result.results.symbols_processed} symbols.`,
          { duration: 5000 }
        )
        
        // Trigger data refresh if callback provided
        if (onDataRefresh) {
          onDataRefresh()
        }
      } else {
        toast.error('ETL pipeline failed. Check the logs for details.')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast.error(`ETL failed: ${errorMessage}`)
    } finally {
      setIsRunningETL(false)
    }
  }

  const handleGenerateRecommendations = async (force: boolean = false) => {
    setIsGeneratingRecs(true)
    
    try {
      const result = await generateRecommendations(selectedDate, force)
      
      if (result.status === 'success') {
        toast.success(
          `Recommendations generated successfully for ${selectedDate}!`,
          { duration: 5000 }
        )
        
        // Trigger data refresh if callback provided
        if (onDataRefresh) {
          onDataRefresh()
        }
      } else {
        toast.error('Failed to generate recommendations. Check the logs for details.')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast.error(`Recommendation generation failed: ${errorMessage}`)
    } finally {
      setIsGeneratingRecs(false)
    }
  }

  const isToday = selectedDate === todayIST()

  return (
    <div className="card border-primary-200 bg-primary-50">
      <div className="card-header border-primary-200">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-primary-900">Admin Actions</h3>
        </div>
        <p className="text-sm text-primary-700 mt-1">
          Administrative functions for data management and analysis
        </p>
      </div>

      <div className="space-y-4">
        {/* ETL Pipeline Actions */}
        <div className="bg-white rounded-lg p-4 border border-primary-200">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Data Pipeline
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Run the ETL pipeline to fetch and process today's market data
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleRunETL(false)}
              disabled={isRunningETL}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isRunningETL ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {isRunningETL ? 'Running...' : 'Run ETL'}
            </button>
            <button
              onClick={() => handleRunETL(true)}
              disabled={isRunningETL}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isRunningETL ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Force Refresh
            </button>
          </div>
        </div>

        {/* Recommendations Generation */}
        <div className="bg-white rounded-lg p-4 border border-primary-200">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            AI Recommendations
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Generate AI-powered recommendations for {selectedDate}
            {!isToday && (
              <span className="text-amber-600 ml-1">(Historical date)</span>
            )}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleGenerateRecommendations(false)}
              disabled={isGeneratingRecs}
              className="btn-success disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGeneratingRecs ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              {isGeneratingRecs ? 'Generating...' : 'Generate'}
            </button>
            <button
              onClick={() => handleGenerateRecommendations(true)}
              disabled={isGeneratingRecs}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGeneratingRecs ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              Force Regenerate
            </button>
          </div>
        </div>

        {/* Status Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Settings className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-amber-800 font-medium">Admin Mode Active</p>
              <p className="text-amber-700 mt-1">
                These actions require admin privileges and will affect the production data.
                Use with caution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
