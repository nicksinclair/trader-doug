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

export interface GetAggregatesRequest {
  ticker: string,
  from?: Date,
  to?: Date,
}

