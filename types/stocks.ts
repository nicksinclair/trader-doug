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

export interface GetAggregatesRequest extends DateRange {
  ticker: string,
}