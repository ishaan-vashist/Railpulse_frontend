# RailPulse Frontend — Daily Market Insights

A production-ready Next.js 14+ frontend application that provides AI-powered market analysis and recommendations. Built with TypeScript, Tailwind CSS, SWR for data fetching, and Recharts for data visualization.

## Features

- **Real-time Market Data**: Live OHLCV prices, volume analysis, and technical indicators
- **AI-Powered Recommendations**: Machine learning-based trading recommendations
- **Interactive Dashboard**: Comprehensive market metrics with responsive design
- **Advanced Charts**: Price and return trend visualization with Recharts
- **Admin Controls**: ETL pipeline management and recommendation generation
- **Fallback Logic**: Automatic data fallback for weekends and holidays
- **IST Timezone Support**: Built-in Indian Standard Time handling

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR with automatic caching and revalidation
- **Charts**: Recharts for responsive data visualization
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns with timezone support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Access to RailPulse FastAPI backend

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RailPulse/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Required: API endpoint
   NEXT_PUBLIC_API_URL=https://railpulse-production.up.railway.app
   
   # Optional: Admin functionality (remove if not needed)
   NEXT_PUBLIC_APP_SECRET=your_app_secret_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | `https://railpulse-production.up.railway.app` | RailPulse API base URL |
| `NEXT_PUBLIC_APP_SECRET` | No | - | Admin secret for protected endpoints |

### Environment Setup Options

**Option 1: Production API (Recommended)**
```env
NEXT_PUBLIC_API_URL=https://railpulse-production.up.railway.app
```

**Option 2: Local Development API**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Option 3: With Admin Features**
```env
NEXT_PUBLIC_API_URL=https://railpulse-production.up.railway.app
NEXT_PUBLIC_APP_SECRET=your_secret_key
```

## Project Structure

```
├── app/
│   ├── (site)/
│   │   └── page.tsx          # Landing page
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard
│   └── layout.tsx            # Root layout
├── components/
│   ├── KPICard.tsx           # Key performance indicator cards
│   ├── SymbolsSelect.tsx     # Multi-select symbol picker
│   ├── DatePicker.tsx        # Date selection component
│   ├── TrendChart.tsx        # Price/return trend charts
│   ├── MetricsTable.tsx      # Market data table
│   ├── AnalystPanel.tsx      # AI recommendations panel
│   └── AdminActions.tsx      # Admin control panel
├── lib/
│   ├── api.ts                # API client functions
│   ├── fetcher.ts            # SWR fetcher utilities
│   ├── date.ts               # IST date helpers
│   └── types.ts              # TypeScript definitions
├── styles/
│   └── globals.css           # Global styles and utilities
└── docs/                     # Documentation
```

## API Integration

The frontend integrates with the RailPulse FastAPI backend through these endpoints:

### Public Endpoints
- `GET /healthz` - Health check
- `GET /metrics` - Market metrics and price data
- `GET /recommendations` - AI-generated recommendations

### Admin Endpoints (requires APP_SECRET)
- `POST /admin/run-today` - Trigger ETL pipeline
- `POST /admin/generate-recommendations` - Generate recommendations

### Data Fetching Strategy

- **SWR Integration**: Automatic caching, revalidation, and error handling
- **Fallback Logic**: If no data for today, automatically tries previous 7 days
- **Real-time Updates**: Data refreshes every 5 minutes for metrics, 10 minutes for recommendations
- **Error Handling**: User-friendly error messages with retry capabilities

## Key Features

### Dashboard Controls
- **Date Picker**: Select any date for historical analysis
- **Symbol Selection**: Multi-select dropdown with search functionality
- **Auto-refresh**: Configurable data refresh intervals
- **URL State**: Symbol selection persisted in query parameters

### KPI Cards
- **Portfolio Return**: Average return across selected symbols
- **Top Gainer**: Best performing symbol with percentage gain
- **Top Loser**: Worst performing symbol with percentage loss

### Data Visualization
- **Trend Charts**: Interactive price/return charts with Recharts
- **Metrics Table**: Comprehensive OHLCV data with technical indicators
- **Responsive Design**: Mobile-first approach with adaptive layouts

### AI Analysis
- **Market Summary**: AI-generated market overview
- **Recommendations**: Actionable trading recommendations
- **Historical Analysis**: Access to past recommendations and analysis

### Admin Features (Optional)
- **ETL Pipeline**: Trigger data collection and processing
- **Recommendation Generation**: Force generate new AI analysis
- **Data Management**: Admin-only controls for data operations

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Code Style

- **TypeScript**: Strict mode enabled with comprehensive type definitions
- **ESLint**: Next.js recommended configuration
- **Tailwind CSS**: Utility-first styling with custom design system
- **Component Architecture**: Reusable, composable React components

### Performance Optimizations

- **SWR Caching**: Intelligent data caching and background updates
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js built-in image optimization
- **Bundle Analysis**: Optimized bundle size with tree shaking

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_APP_SECRET` (if needed)

### Netlify

1. **Connect GitHub repository to Netlify**

2. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Environment variables**
   - Add variables in Netlify dashboard

### Railway

1. **Connect repository to Railway**

2. **Configure build**
   - Railway auto-detects Next.js projects
   - Set environment variables in Railway dashboard

3. **Custom domain** (optional)
   - Configure custom domain in Railway settings

### Docker (Self-hosted)

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## CORS Configuration

Ensure your RailPulse API backend allows requests from your frontend domain:

```python
# In your FastAPI main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",           # Development
        "https://your-app.vercel.app",     # Vercel
        "https://your-app.netlify.app",    # Netlify
        "https://your-domain.com",         # Custom domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Troubleshooting

### Common Issues

**1. API Connection Errors**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check if API backend is running
- Ensure CORS is configured properly

**2. No Data Available**
- Check if symbols are configured in backend
- Verify date format (YYYY-MM-DD)
- Try fallback dates for weekends/holidays

**3. Admin Features Not Working**
- Ensure `NEXT_PUBLIC_APP_SECRET` is set
- Verify secret matches backend configuration
- Check browser console for authentication errors

**4. Build Errors**
- Clear `.next` directory: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

### Performance Issues

**1. Slow Loading**
- Check network requests in browser DevTools
- Verify API response times
- Consider reducing data refresh intervals

**2. Memory Issues**
- Monitor browser memory usage
- Check for memory leaks in components
- Optimize chart data size

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the [API documentation](./docs/FRONTEND_INTEGRATION.md)
- Review [backend implementation](./docs/BACKEND_IMPLEMENTATION.md)
- Open an issue on GitHub

---

**RailPulse** — Empowering traders with AI-driven market insights.
