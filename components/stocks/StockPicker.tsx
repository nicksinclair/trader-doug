import { useMemo } from 'react'

import { getSnapshotAllTickers } from '@/app/api'
import { Label } from '@/components/ui/label'
import { SP_500_TICKERS } from '@/lib/defaults'
import { tdLocalStorage } from '@/lib/localStorage'
import { SELECTED_TICKERS_KEY, TICKERS_KEY } from '@/lib/queryKeys'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { MultiSelectCombobox } from '../patterns/MultiSelectCombobox'

export default function StockPicker() {
  const queryClient = useQueryClient()

  const { data: tickerResults } = useQuery({
    queryKey: [TICKERS_KEY],
    queryFn: () => getSnapshotAllTickers(SP_500_TICKERS),
  })

  const { data: selectedTickers, isLoading: isLoadingSelectedTickers } = useQuery<string[]>({
    queryKey: [SELECTED_TICKERS_KEY],
  })

  const options = useMemo(() => (tickerResults ?? []).map(({ ticker }, index) => ({
    label: ticker ?? '',
    value: ticker ?? index.toString(),
  })), [tickerResults])

  const onChange = (selectedItems: string[]) => {
    queryClient.setQueryData([SELECTED_TICKERS_KEY], selectedItems)
    tdLocalStorage.setItem('selectedTickers', JSON.stringify(selectedItems))
  }

  return (
    <div className="flex flex-col w-full space-y-2">
      <Label>Select stock tickers</Label>
      <MultiSelectCombobox
        options={options}
        defaultSelected={selectedTickers}
        disabled={isLoadingSelectedTickers}
        emptyMessage='No tickers found.'
        placeholder={'Select tickers...'}
        onChange={onChange}
      />
    </div>
  )
}