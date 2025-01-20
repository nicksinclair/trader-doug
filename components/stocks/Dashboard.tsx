import { DEFAULT_TICKERS } from '@/lib/defaults'

import StockDataCard from './StockDataCard'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      {DEFAULT_TICKERS.map((ticker) => (
        <StockDataCard key={ticker} ticker={ticker} />
      ))}
    </div>
  )
}