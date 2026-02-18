/**
 * API Route: Register
 */
import { NextRequest, NextResponse } from 'next/server';

const GAS_API_URL = process.env.NEXT_PUBLIC_GAS_API_URL || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Call GAS backend
    const response = await fetch(`${GAS_API_URL}?path=/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok && data.data) {
      return NextResponse.json({
        token: data.data.token || 'mock-token-' + Date.now(),
        user: data.data
      });
    } else {
      return NextResponse.json(
        { error: data.error || data.data?.error || 'Registration failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
