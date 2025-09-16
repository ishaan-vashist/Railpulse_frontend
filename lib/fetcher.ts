import { APIError } from './types';

// Use the proxy API route for client-side requests to avoid CORS issues
const API_BASE_URL = typeof window === 'undefined'
  ? process.env.NEXT_PUBLIC_API_URL || 'https://railpulse-production.up.railway.app'
  : '/api/proxy';

/**
 * Generic fetcher function for SWR
 * Handles error responses and throws appropriate errors
 */
export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    
    try {
      const errorData: APIError = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch {
      // If we can't parse the error response, use the default message
    }
    
    throw new Error(errorMessage);
  }
  
  return response.json();
}

/**
 * Build API URL with base URL
 */
export function buildAPIUrl(endpoint: string, params?: Record<string, string>): string {
  const url = new URL(endpoint, API_BASE_URL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });
  }
  
  return url.toString();
}

/**
 * Fetcher with automatic retry logic for transient errors
 */
export async function fetcherWithRetry<T>(
  url: string, 
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fetcher<T>(url);
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on client errors (4xx)
      if (error instanceof Error && error.message.includes('HTTP 4')) {
        throw error;
      }
      
      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
    }
  }
  
  throw lastError!;
}
