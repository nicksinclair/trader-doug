import { DEFAULT_TICKERS } from '@/lib/defaults'

import StockDataCard from './StockDataCard'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {DEFAULT_TICKERS.map((ticker) => (
        <StockDataCard key={ticker} ticker={ticker} />
      ))}
    </div>
  )
}