import { DateRange } from './dateRange'

export interface GetAggregatesResponse {
  ticker: string
  queryCount: number
  resultsCount: number
  adjusted: boolean
  results: {
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


