import { NextResponse } from 'next/server'

import { referenceClient } from '../client'

export async function GET() {
  try {
    const response = await referenceClient.tickers()

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching data:', error)

    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
}

