'use client'

import { useEffect, useMemo } from 'react'

import { Snapshots } from '@/app/api'
import DateRangePicker from '@/components/patterns/DateRangePicker'
import StockData from '@/components/stocks/StockData'
import StockPicker from '@/components/stocks/StockPicker'
import { DEFAULT_TICKERS } from '@/lib/defaults'
import { tdLocalStorage } from '@/lib/localStorage'
import { SELECTED_TICKERS_KEY, TICKERS_KEY } from '@/lib/queryKeys'
import { safeJSONParse } from '@/lib/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function Dashboard() {
  const queryClient = useQueryClient()

  // Fetch localStorage tickers after mount to avoid hydration mismatch
  useEffect(() => {
    const storedTickers = safeJSONParse<string[]>(tdLocalStorage.getItem('selectedTickers'))
    // If there are no tickers in localStorage, use the default tickers
    queryClient.setQueryData([SELECTED_TICKERS_KEY], (storedTickers && storedTickers.length !== 0) ? storedTickers : DEFAULT_TICKERS)
  }, [queryClient])

  const { data: tickerSnapshots } = useQuery<Snapshots>({ queryKey: [TICKERS_KEY] })

  const { data: selectedTickers } = useQuery<string[]>({
    queryKey: [SELECTED_TICKERS_KEY],
  })

  const snapshotsByTicker = useMemo(() => {
    const snapshots: { [ticker: string]: NonNullable<Snapshots>[0] } = {}
    if (tickerSnapshots) {
      tickerSnapshots.forEach((snapshot) => {
        if (snapshot.ticker) {
          snapshots[snapshot.ticker] = snapshot
        }
      })
    }
    return snapshots
  }, [tickerSnapshots])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col px-4 gap-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <div className="flex flex-col md:flex-row items-end gap-4">
          <StockPicker />
          <DateRangePicker />
        </div>
      </div>

      {!selectedTickers && <div className='m-auto'>Loading stock data...</div>}
      {selectedTickers?.length === 0 && <div className='m-auto'>Select a ticker to see stock data</div>}
      {selectedTickers && selectedTickers.map((ticker) => (
        <StockData key={ticker} ticker={ticker} snapshot={snapshotsByTicker[ticker]} />
      ))}
    </div>
  )
}