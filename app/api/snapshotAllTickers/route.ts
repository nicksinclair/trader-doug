import { NextResponse } from 'next/server'

import { stocksClient } from '../client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tickers = searchParams.get('tickers') ?? undefined

  try {
    const response = await stocksClient.snapshotAllTickers({ tickers })

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching data:', error)

    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
}

