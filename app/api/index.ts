import { format, subDays } from 'date-fns'

import { GetAggregatesRequest, GetAggregatesResponse } from '@/types/stocks'

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

  const data: GetAggregatesResponse = await response.json()

  // const data: GetAggregatesResponse = {
  //   ticker: 'AAPL',
  //   queryCount: 1,
  //   resultsCount: 1,
  //   adjusted: false,
  //   results: [
  //     {
  //       c: 100,
  //       h: 100,
  //       l: 100,
  //       n: 100,
  //       o: 100,
  //       t: 100,
  //       v: 100,
  //       vw: 100,
  //     },
  //   ],
  //   status: 'OK',
  //   request_id: '1234',
  //   count: 1,
  // }

  return data
}