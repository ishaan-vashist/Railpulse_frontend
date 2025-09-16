# Deploying RailPulse Frontend to Railway

This guide explains how to deploy the RailPulse Frontend to Railway.

## Prerequisites

1. [Railway account](https://railway.app/)
2. Git repository with your RailPulse Frontend code

## Deployment Steps

### 1. Initial Setup

1. Log in to [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your RailPulse Frontend repository
4. Railway will automatically detect your Next.js project

### 2. Configure Environment Variables

Add the following environment variables in the Railway dashboard:

```
NEXT_PUBLIC_API_URL=https://railpulse-production.up.railway.app
NEXT_PUBLIC_APP_SECRET=your_app_secret_here (if needed)
```

### 3. Deploy Settings

Railway will automatically use the configuration from:
- `railway.json` - Defines build and deploy settings
- `Procfile` - Specifies the web process command

### 4. Verify Deployment

1. Monitor the deployment logs in the Railway dashboard
2. Once deployed, Railway will provide a URL for your frontend application
3. Test the application by navigating to the provided URL

### 5. Custom Domain (Optional)

1. In your project dashboard, go to "Settings" → "Domains"
2. Add your custom domain and follow the DNS configuration instructions

## Troubleshooting

If your deployment fails:

1. Check the logs in the Railway dashboard
2. Verify your environment variables are set correctly
3. Ensure your API URL is accessible
4. Check for any build errors in the logs

## Updating Your Deployment

To update your deployment:

1. Push changes to your GitHub repository
2. Railway will automatically redeploy your application

## Monitoring

Railway provides built-in monitoring for your application:

1. View logs in the Railway dashboard
2. Monitor resource usage in the dashboard
