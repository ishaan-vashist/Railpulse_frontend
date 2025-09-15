'use client'

import { Calendar } from 'lucide-react'
import { formatAPIDate, formatDisplayDate, todayIST } from '@/lib/date'

interface DatePickerProps {
  selectedDate: string
  onDateChange: (date: string) => void
  disabled?: boolean
  maxDate?: string
  minDate?: string
}

export default function DatePicker({ 
  selectedDate, 
  onDateChange, 
  disabled = false,
  maxDate = todayIST(),
  minDate
}: DatePickerProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value)
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          disabled={disabled}
          max={maxDate}
          min={minDate}
          className={`
            w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white
            focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        />
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
      <div className="mt-1 text-xs text-gray-500">
        {formatDisplayDate(selectedDate)}
      </div>
    </div>
  )
}
