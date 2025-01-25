import { DEFAULT_TICKERS } from '@/lib/defaults'
import { SELECTED_TICKERS_KEY } from '@/lib/queryKeys'
import { useQuery } from '@tanstack/react-query'

import DateRangePicker from '../patterns/DateRangePicker'
import StockData from '../stocks/StockData'
import StockPicker from '../stocks/StockPicker'

export default function Dashboard() {
  const { data: selectedTickers } = useQuery<string[]>({
    queryKey: [SELECTED_TICKERS_KEY],
    initialData: DEFAULT_TICKERS,
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col px-4 gap-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <div className="flex flex-row items-end gap-4">
          <StockPicker />
          <DateRangePicker />
        </div>
      </div>

      {selectedTickers.length === 0 && <div className='m-auto'>Select a ticker to see stock data</div>}
      {selectedTickers.map((ticker) => (
        <StockData key={ticker} ticker={ticker} />
      ))}
    </div>
  )
}