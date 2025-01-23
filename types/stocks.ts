import { DateRange } from './dateRange'

export interface Aggregate {
  /** Close price */
  c: number
  /** Highest price */
  h: number
  /** Lowest price */
  l: number
  /** Number of transactions */
  n: number
  /** Open price */
  o: number
  /** Timestamp */
  t: number
  /** Trading volume */
  v: number
  /** Volume weighted average price */
  vw: number
}

export interface GetAggregatesResponse {
  adjusted: boolean
  count: number
  queryCount: number
  request_id: string
  results: Aggregate[]
  resultsCount: number
  status: string
  ticker: string
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


