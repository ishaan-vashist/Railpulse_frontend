// API Response Types
export interface HealthResponse {
  status: string;
  timestamp: string;
}

export interface DailyPrice {
  trade_date: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adj_close: number;
  volume: number;
  source: string;
}

export interface DailyMetric {
  trade_date: string;
  symbol: string;
  return_pct: number;
  ma7: number;
  ma30: number;
  rsi14: number;
  vol7: number;
  high20: number;
  low20: number;
}

export interface MetricsResponse {
  date: string;
  symbols: string[];
  prices: DailyPrice[];
  metrics: DailyMetric[];
}

export interface RecommendationsResponse {
  date: string;
  scope: string;
  summary: string;
  recommendations: string[] | { title: string; action: string }[];
  created_at: string;
}

export interface AdminRunResponse {
  success: boolean;
  message: string;
  results: {
    trade_date: string;
    symbols_requested: number;
    symbols_processed: number;
    symbols_failed: number;
    symbols_no_data: number;
    processed_symbols: string[];
    failed_symbols: string[];
    no_data_symbols: string[];
    llm_analysis: {
      success: boolean;
      summary: string;
      recommendations_count: number;
    };
  };
}

export interface AdminRecommendationsResponse {
  status: string;
  message: string;
  recommendations: {
    date: string;
    summary: string;
    recommendations: string[];
    portfolio_data: {
      symbols_count: number;
      portfolio_return: number;
      top_gainer: {
        symbol: string;
        return_pct: number;
      };
      top_loser: {
        symbol: string;
        return_pct: number;
      };
    };
  };
}

// UI Component Types
export interface KPIData {
  portfolioReturn: number;
  topGainer: {
    symbol: string;
    return: number;
  };
  topLoser: {
    symbol: string;
    return: number;
  };
}

export interface ChartDataPoint {
  date: string;
  value: number;
  symbol?: string;
}

export interface TrendChartProps {
  data: ChartDataPoint[];
  type: 'price' | 'return';
  height?: number;
}

// Error Types
export interface APIError {
  detail: string;
}

// Symbol Options
export const DEFAULT_SYMBOLS = ['AAPL', 'MSFT', 'SPY', 'BTC-USD'];

export const SYMBOL_OPTIONS = [
  { value: 'AAPL', label: 'Apple Inc.' },
  { value: 'MSFT', label: 'Microsoft Corp.' },
  { value: 'SPY', label: 'SPDR S&P 500 ETF' },
  { value: 'BTC-USD', label: 'Bitcoin USD' },
  { value: 'INFY', label: 'Infosys Ltd.' },
  { value: 'RELIANCE', label: 'Reliance Industries' },
  { value: 'GOOGL', label: 'Alphabet Inc.' },
  { value: 'TSLA', label: 'Tesla Inc.' },
  { value: 'AMZN', label: 'Amazon.com Inc.' },
  { value: 'NVDA', label: 'NVIDIA Corp.' },
];
