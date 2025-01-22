import { DEFAULT_TICKERS } from '@/lib/defaults'
import { TICKERS_KEY } from '@/lib/queryKeys'
import { useQuery } from '@tanstack/react-query'

import { MultiSelectCombobox } from '../patterns/MultiSelectCombobox'

export default function StockPicker() {
  const { data: tickers } = useQuery({
    queryKey: [TICKERS_KEY],
    queryFn: () => DEFAULT_TICKERS,
  })

  const options = (tickers ?? []).map((ticker) => ({
    label: ticker,
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