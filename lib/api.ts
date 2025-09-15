import { 
  HealthResponse, 
  MetricsResponse, 
  RecommendationsResponse, 
  AdminRunResponse, 
  AdminRecommendationsResponse 
} from './types';
import { buildAPIUrl, fetcher } from './fetcher';

const APP_SECRET = process.env.NEXT_PUBLIC_APP_SECRET;

/**
 * Check API health status
 */
export async function fetchHealth(): Promise<HealthResponse> {
  const url = buildAPIUrl('/healthz');
  return fetcher<HealthResponse>(url);
}

/**
 * Fetch market metrics for specified date and symbols
 */
export async function fetchMetrics(
  date?: string, 
  symbols?: string[]
): Promise<MetricsResponse> {
  const params: Record<string, string> = {};
  
  if (date) {
    params.date = date;
  }
  
  if (symbols && symbols.length > 0) {
    params.symbol = symbols.join(',');
  }
  
  const url = buildAPIUrl('/metrics', params);
  return fetcher<MetricsResponse>(url);
}

/**
 * Fetch AI-generated recommendations for a specific date
 */
export async function fetchRecommendations(date?: string): Promise<RecommendationsResponse> {
  const params: Record<string, string> = {};
  
  if (date) {
    params.date = date;
  }
  
  const url = buildAPIUrl('/recommendations', params);
  return fetcher<RecommendationsResponse>(url);
}

/**
 * Run ETL pipeline (admin only)
 */
export async function runETLPipeline(forceRefresh: boolean = false): Promise<AdminRunResponse> {
  if (!APP_SECRET) {
    throw new Error('Admin functionality not available - APP_SECRET not configured');
  }
  
  const params: Record<string, string> = {
    app_secret: APP_SECRET,
  };
  
  if (forceRefresh) {
    params.force_refresh = 'true';
  }
  
  const url = buildAPIUrl('/admin/run-today', params);
  
  const response = await fetch(url, {
    method: 'POST',
  });
  
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch {
      // If we can't parse the error response, use the default message
    }
    
    throw new Error(errorMessage);
  }
  
  return response.json();
}

/**
 * Generate recommendations for a specific date (admin only)
 */
export async function generateRecommendations(
  date: string, 
  force: boolean = false
): Promise<AdminRecommendationsResponse> {
  if (!APP_SECRET) {
    throw new Error('Admin functionality not available - APP_SECRET not configured');
  }
  
  const params: Record<string, string> = {
    app_secret: APP_SECRET,
    date: date,
  };
  
  if (force) {
    params.force = 'true';
  }
  
  const url = buildAPIUrl('/admin/generate-recommendations', params);
  
  const response = await fetch(url, {
    method: 'POST',
  });
  
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch {
      // If we can't parse the error response, use the default message
    }
    
    throw new Error(errorMessage);
  }
  
  return response.json();
}

/**
 * Check if admin functionality is available
 */
export function isAdminEnabled(): boolean {
  return !!APP_SECRET;
}
