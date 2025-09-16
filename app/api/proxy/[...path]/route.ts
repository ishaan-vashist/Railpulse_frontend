import { NextRequest, NextResponse } from 'next/server';

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
    // Reconstruct the path from the path segments
    const path = params.path.join('/');
    
    // Get the search params from the request URL
    const { searchParams } = new URL(request.url);
    
    // Build the target URL with search params
    const targetUrl = new URL(`/${path}`, API_BASE_URL);
    searchParams.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });

    // Forward the request to the API
    const response = await fetch(targetUrl.toString(), {
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
    // Reconstruct the path from the path segments
    const path = params.path.join('/');
    
    // Get the search params from the request URL
    const { searchParams } = new URL(request.url);
    
    // Build the target URL with search params
    const targetUrl = new URL(`/${path}`, API_BASE_URL);
    searchParams.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });

    // Get the request body
    const body = await request.json().catch(() => null);

    // Forward the request to the API
    const response = await fetch(targetUrl.toString(), {
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
