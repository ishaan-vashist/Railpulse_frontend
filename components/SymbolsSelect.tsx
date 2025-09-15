'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, X, Check } from 'lucide-react'
import { SYMBOL_OPTIONS } from '@/lib/types'

interface SymbolsSelectProps {
  selectedSymbols: string[]
  onSelectionChange: (symbols: string[]) => void
  disabled?: boolean
}

export default function SymbolsSelect({ 
  selectedSymbols, 
  onSelectionChange, 
  disabled = false 
}: SymbolsSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredOptions = SYMBOL_OPTIONS.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleToggleSymbol = (symbol: string) => {
    if (selectedSymbols.includes(symbol)) {
      onSelectionChange(selectedSymbols.filter(s => s !== symbol))
    } else {
      onSelectionChange([...selectedSymbols, symbol])
    }
  }

  const handleRemoveSymbol = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onSelectionChange(selectedSymbols.filter(s => s !== symbol))
  }

  const handleClearAll = () => {
    onSelectionChange([])
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`
          min-h-[42px] w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer
          flex items-center justify-between gap-2
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}
          ${isOpen ? 'border-primary-500 ring-1 ring-primary-500' : ''}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 flex-1 min-w-0">
          {selectedSymbols.length === 0 ? (
            <span className="text-gray-500">Select symbols...</span>
          ) : (
            selectedSymbols.map(symbol => {
              const option = SYMBOL_OPTIONS.find(opt => opt.value === symbol)
              return (
                <span
                  key={symbol}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-md"
                >
                  {option?.value || symbol}
                  {!disabled && (
                    <button
                      onClick={(e) => handleRemoveSymbol(symbol, e)}
                      className="hover:bg-primary-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              )
            })
          )}
        </div>
        <div className="flex items-center gap-1">
          {selectedSymbols.length > 0 && !disabled && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClearAll()
              }}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <ChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search symbols..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No symbols found</div>
            ) : (
              filteredOptions.map(option => {
                const isSelected = selectedSymbols.includes(option.value)
                return (
                  <div
                    key={option.value}
                    className={`
                      px-3 py-2 cursor-pointer flex items-center justify-between
                      hover:bg-gray-50 transition-colors
                      ${isSelected ? 'bg-primary-50 text-primary-900' : 'text-gray-900'}
                    `}
                    onClick={() => handleToggleSymbol(option.value)}
                  >
                    <div>
                      <div className="font-medium">{option.value}</div>
                      <div className="text-sm text-gray-500">{option.label}</div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-primary-600" />
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
