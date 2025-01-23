import { getTickers } from '@/app/api'
import { SELECTED_TICKERS_KEY, TICKERS_KEY } from '@/lib/queryKeys'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { MultiSelectCombobox } from '../patterns/MultiSelectCombobox'

export default function StockPicker() {
  const queryClient = useQueryClient()

  const { data: tickerResults } = useQuery({
    queryKey: [TICKERS_KEY],
    queryFn: () => getTickers(),
  })

  const options = (tickerResults ?? []).map(({ name, ticker }) => ({
    label: `${ticker} - ${name}`,
    value: ticker,
  }))

  const onChange = (selectedItems: string[]) => {
    queryClient.setQueryData([SELECTED_TICKERS_KEY], selectedItems)
  }

  return (
    <MultiSelectCombobox
      options={options}
      placeholder={'Select tickers...'}
      emptyMessage='No tickers found.'
      onChange={onChange}
    />
  )
}