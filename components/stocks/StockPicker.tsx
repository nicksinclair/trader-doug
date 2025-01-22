import { getTickers } from '@/app/api'
import { TICKERS_KEY } from '@/lib/queryKeys'
import { useQuery } from '@tanstack/react-query'

import { MultiSelectCombobox } from '../patterns/MultiSelectCombobox'

export default function StockPicker() {
  const { data: tickerResults } = useQuery({
    queryKey: [TICKERS_KEY],
    queryFn: () => getTickers(),
  })

  const options = (tickerResults ?? []).map(({ name, ticker }) => ({
    label: `${ticker} - ${name}`,
    value: ticker,
  }))

  return (
    <MultiSelectCombobox
      options={options}
      placeholder={'Select tickers...'}
      emptyMessage='No tickers found.'
    />
  )
}