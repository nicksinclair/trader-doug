import { DEFAULT_TICKERS } from '@/lib/defaults'

import { MultiSelectCombobox } from '../patterns/MultiSelectCombobox'

const options = DEFAULT_TICKERS.map((ticker) => ({
  label: ticker,
  value: ticker,
}))

export default function StockPicker() {
  return (
    <MultiSelectCombobox options={options} />
  )
}