import { NextResponse } from 'next/server'

import { referenceClient } from '../client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticker = searchParams.get('ticker')

  if (!ticker) {
    return NextResponse.json({ error: 'No ticker provided' }, { status: 400 })
  }

  try {
    const response = await referenceClient.tickerNews({ ticker, limit: 3, sort: 'published_utc' })

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching data:', error)

    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
}

