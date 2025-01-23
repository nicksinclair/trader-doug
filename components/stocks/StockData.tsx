'use client'

// import { format } from 'date-fns'

import { getAggregates } from '@/app/api'
// import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DATE_RANGE_KEY } from '@/lib/queryKeys'
import { useQuery } from '@tanstack/react-query'

import { StockDataTable } from './stockDataTable/StockDataTable'

import type { DateRange } from '@/types/dateRange'
interface StockDataProps {
  ticker: string
}

export default function StockData({ ticker }: StockDataProps) {
  const { data: dateRange } = useQuery<DateRange>({ queryKey: [DATE_RANGE_KEY] })

  const { data: stockData, isLoading, isError } = useQuery({
    queryKey: ['stockData', ticker, JSON.stringify(dateRange)],
    queryFn: () => {
      try {
        return getAggregates({ ticker, ...dateRange })
      } catch (error) {
        console.error('Error fetching stock data:', error)
      }
    },
    enabled: !!dateRange?.from && !!dateRange?.to,
  })

  return (
    <div className="flex flex-row border-y">
      <h3 className="text-xl font-bold w-[120px] p-4">{ ticker }</h3>
      <Separator orientation="vertical" />
      {isLoading && <div className="w-full m-auto text-center">Loading...</div>}
      {(isError || stockData?.results?.length === 0) && <div>Could not load stock data</div>}
      {stockData && <div className="flex flex-col w-full gap-4">
        {<StockDataTable stockData={stockData.results} />}
      </div>}
    </div>
  )
}

