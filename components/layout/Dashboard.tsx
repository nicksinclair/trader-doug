import { DEFAULT_TICKERS } from '@/lib/defaults'

import DateRangePicker from '../patterns/DateRangePicker'
import StockDataCard from '../stocks/StockDataCard'
import StockPicker from '../stocks/StockPicker'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <DateRangePicker />

      <StockPicker />

      {DEFAULT_TICKERS.map((ticker) => (
        <StockDataCard key={ticker} ticker={ticker} />
      ))}
    </div>
  )
}