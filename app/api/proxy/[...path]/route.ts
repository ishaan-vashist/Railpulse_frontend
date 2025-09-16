import { NextRequest, NextResponse } from 'next/server';

// Define the backend API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://railpulse-production.up.railway.app';

/**
 * API route that acts as a proxy to the backend API
 * This helps bypass CORS restrictions by having the request come from the same origin
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Get the path segments and join them
    const pathSegments = params.path || [];
    const pathPart = pathSegments.join('/');
    
    // Create the full URL string manually to avoid URL constructor issues
    let fullUrl = API_BASE_URL;
    if (!fullUrl.endsWith('/') && pathPart) {
      fullUrl += '/';
    }
    fullUrl += pathPart;
    
    // Add query parameters from the original request
    const originalUrl = new URL(request.url);
    const searchParams = originalUrl.searchParams;
    if (searchParams.toString()) {
      fullUrl += `?${searchParams.toString()}`;
    }
    
    console.log(`Proxying GET request to: ${fullUrl}`);
    
    // Forward the request to the API
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    // Get the response data
    const data = await response.json();

    // Return the response
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { detail: 'Failed to fetch data from API' },
      { status: 500 }
    );
  }
}

/**
 * Handle POST requests
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Get the path segments and join them
    const pathSegments = params.path || [];
    const pathPart = pathSegments.join('/');
    
    // Create the full URL string manually to avoid URL constructor issues
    let fullUrl = API_BASE_URL;
    if (!fullUrl.endsWith('/') && pathPart) {
      fullUrl += '/';
    }
    fullUrl += pathPart;
    
    // Add query parameters from the original request
    const originalUrl = new URL(request.url);
    const searchParams = originalUrl.searchParams;
    if (searchParams.toString()) {
      fullUrl += `?${searchParams.toString()}`;
    }
    
    console.log(`Proxying POST request to: ${fullUrl}`);
    
    // Get the request body
    const body = await request.json().catch(() => null);

    // Forward the request to the API
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Get the response data
    const data = await response.json();

    // Return the response
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { detail: 'Failed to fetch data from API' },
      { status: 500 }
    );
  }
}
