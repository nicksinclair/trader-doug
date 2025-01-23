import { format, subDays } from 'date-fns'

import { uniqBy } from '@/lib/utils'
import { GetAggregatesRequest } from '@/types/stocks'
import { IAggs, ISnapshotTickers, ITickers } from '@polygon.io/client-js'

export async function getAggregates(request: GetAggregatesRequest) {
  const { ticker, ...options } = request

  // Default to the previous day if no date is provided
  const defaultDate = subDays(new Date(), 1)

  const params = new URLSearchParams({
    ticker,
    from: format(options.from ?? defaultDate, 'yyyy-MM-dd'),
    to: format(options.to ?? defaultDate, 'yyyy-MM-dd'),
  })

  const response = await fetch(`/api/aggregates?${params}`)

  if (!response.ok) {
    throw new Error('Failed to fetch aggregates')
  }

  const data: IAggs = await response.json()

  return data
}

export async function getSnapshotAllTickers(tickers: string[]) {
  const response = await fetch(`/api/snapshotAllTickers?tickers=${tickers.join(',')}`)

  if (!response.ok) {
    throw new Error('Failed to fetch aggregates')
  }

  const data: ISnapshotTickers = await response.json()

  return uniqBy(data.tickers ?? [], snapshotInfo => snapshotInfo.ticker)
}

export async function getTickers() {
  const response = await fetch('/api/tickers')

  if (!response.ok) {
    throw new Error('Failed to fetch tickers')
  }

  const data: ITickers = await response.json()

  return uniqBy(data.results, result => result.ticker)
}