import { format } from 'date-fns'

import { GetAggregatesRequest, GetAggregatesResponse } from '@/types/stocks'

export async function getAggregates(request: GetAggregatesRequest) {
  const { ticker, ...options } = request

  const params = new URLSearchParams({
    ticker,
    from: format(options.from ?? new Date(), 'yyyy-MM-dd'),
    to: format(options.to ?? new Date(), 'yyyy-MM-dd'),
  })

  const response = await fetch(`/api/aggregates?${params}`)

  if (!response.ok) {
    throw new Error('Failed to fetch aggregates')
  }

  const data: GetAggregatesResponse = await response.json()
  return data
}