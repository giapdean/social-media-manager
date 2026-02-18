/**
 * API Route: Login
 */
import { NextRequest, NextResponse } from 'next/server';

const GAS_API_URL = process.env.NEXT_PUBLIC_GAS_API_URL || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Call GAS backend
    const response = await fetch(`${GAS_API_URL}?path=/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.data) {
      // Return user data with token
      return NextResponse.json({
        token: data.data.token || 'mock-token-' + Date.now(),
        user: data.data
      });
    } else {
      return NextResponse.json(
        { error: data.error || data.data?.error || 'Login failed' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
