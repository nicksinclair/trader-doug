import { NextResponse } from 'next/server'

import { stocksClient } from '../client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticker = searchParams.get('ticker')
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const timespan = searchParams.get('timespan') || 'day'
  const multiplier = parseInt(searchParams.get('multiplier') || '1')

  if (!ticker || !from || !to) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  try {
    const response = await stocksClient.aggregates(ticker, multiplier, timespan, from, to)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching data:', error)

    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
}

