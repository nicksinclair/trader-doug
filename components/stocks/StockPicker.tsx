import { getSnapshotAllTickers } from '@/app/api'
import { SP_500_TICKERS } from '@/lib/defaults'
import { SELECTED_TICKERS_KEY, TICKERS_KEY } from '@/lib/queryKeys'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { MultiSelectCombobox } from '../patterns/MultiSelectCombobox'

export default function StockPicker() {
  const queryClient = useQueryClient()

  const { data: tickerResults } = useQuery({
    queryKey: [TICKERS_KEY],
    queryFn: () => getSnapshotAllTickers(SP_500_TICKERS),
  })

  const options = (tickerResults ?? []).map(({ ticker }, index) => ({
    label: ticker ?? '',
    value: ticker ?? index.toString(),
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