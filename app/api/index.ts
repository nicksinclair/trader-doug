import { format, subDays } from 'date-fns'

import { uniqBy } from '@/lib/utils'
import { GetAggregatesRequest, GetAggregatesResponse, GetTickersResponse } from '@/types/stocks'

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
  //     {
  //       c: 100,
  //       h: 100,
  //       l: 100,
  //       n: 100,
  //       o: 100,
  //       t: 101,
  //       v: 100,
  //       vw: 100,
  //     },
  //     {
  //       c: 100,
  //       h: 100,
  //       l: 100,
  //       n: 100,
  //       o: 100,
  //       t: 102,
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

export async function getTickers() {
  const response = await fetch('/api/tickers')

  if (!response.ok) {
    throw new Error('Failed to fetch tickers')
  }

  const data: GetTickersResponse = await response.json()

  // const data: GetTickersResponse = {
  //   count: 1,
  //   request_id: 'e70013d92930de90e089dc8fa098888e',
  //   results: [
  //     {
  //       active: true,
  //       cik: '0001090872',
  //       composite_figi: 'BBG000BWQYZ5',
  //       currency_name: 'usd',
  //       last_updated_utc: '2021-04-25T00:00:00Z',
  //       locale: 'us',
  //       market: 'stocks',
  //       name: 'Agilent Technologies Inc.',
  //       primary_exchange: 'XNYS',
  //       share_class_figi: 'BBG001SCTQY4',
  //       ticker: 'A',
  //       type: 'CS',
  //     },
  //   ],
  //   status: 'OK'
  // }

  return uniqBy(data.results, result => result.ticker)
}