import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticker = searchParams.get('ticker')
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const timespan = searchParams.get('timespan') || 'day'
  const multiplier = searchParams.get('multiplier') || '1'

  if (!ticker || !from || !to) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplier}/${timespan}/${from}/${to}?apiKey=${process.env.POLYGON_API_KEY}`
    )
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
}

