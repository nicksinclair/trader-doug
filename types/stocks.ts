import { DateRange } from './dateRange'

export interface GetAggregatesResponse {
  ticker: string
  queryCount: number
  resultsCount: number
  adjusted: boolean
  results: {
    c: number // close price
    h: number // highest price
    l: number // lowest price
    n: number // number of transactions
    o: number // open price
    t: number // timestamp
    v: number // trading volume
    vw: number // volume weighted average price
  }[]
  status: string
  request_id: string
  count: number
}

export interface GetAggregatesRequest extends DateRange {
  ticker: string,
}

interface Ticker {
  active: boolean
  base_currency_symbol?: string
  cik?: string
  composite_figi?: string
  currency_name?: string
  delisted_utc?: string
  last_updated_utc?: string
  locale: string
  market: string
  name: string
  primary_exchange: string
  share_class_figi?: string
  ticker: string
  type: string
}

export interface GetTickersResponse {
  count: number
  next_url?: string
  request_id: string
  results: Ticker[]
  status: string
}


