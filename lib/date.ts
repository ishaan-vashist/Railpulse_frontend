import { format, subDays, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const IST_TIMEZONE = 'Asia/Kolkata';

/**
 * Get today's date in IST timezone formatted as YYYY-MM-DD
 */
export function todayIST(): string {
  const now = new Date();
  const istDate = toZonedTime(now, IST_TIMEZONE);
  return format(istDate, 'yyyy-MM-dd');
}

/**
 * Get current time in IST timezone
 */
export function nowIST(): Date {
  const now = new Date();
  return toZonedTime(now, IST_TIMEZONE);
}

/**
 * Convert a date string to IST timezone
 */
export function toIST(dateString: string): Date {
  const date = parseISO(dateString);
  return toZonedTime(date, IST_TIMEZONE);
}

/**
 * Format a date for display
 */
export function formatDisplayDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const istDate = toZonedTime(dateObj, IST_TIMEZONE);
  return format(istDate, 'MMM dd, yyyy');
}

/**
 * Format a date for API calls (YYYY-MM-DD)
 */
export function formatAPIDate(date: Date): string {
  const istDate = toZonedTime(date, IST_TIMEZONE);
  return format(istDate, 'yyyy-MM-dd');
}

/**
 * Get previous business days for fallback logic
 * Returns array of dates going back up to maxDays
 */
export function getPreviousDays(maxDays: number = 7): string[] {
  const today = nowIST();
  const dates: string[] = [];
  
  for (let i = 0; i < maxDays; i++) {
    const date = subDays(today, i);
    dates.push(formatAPIDate(date));
  }
  
  return dates;
}

/**
 * Get fallback dates for data fetching
 * Starts with today and goes back up to 7 days
 */
export function getFallbackDates(): string[] {
  return getPreviousDays(7);
}

/**
 * Check if a date string is today in IST
 */
export function isToday(dateString: string): boolean {
  return dateString === todayIST();
}

/**
 * Get days ago text for display
 */
export function getDaysAgoText(dateString: string): string {
  const today = todayIST();
  const targetDate = parseISO(dateString);
  const todayDate = parseISO(today);
  
  const diffTime = todayDate.getTime() - targetDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}
