'use client'

import { getAggregates } from '@/app/api'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
      <div className="w-full">
        <Tabs defaultValue="table">
          <TabsList className="w-full">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
          <TabsContent value="table">
            {isLoading && <div className="w-full m-auto p-4 text-center">Loading stock data...</div>}
            {(isError || stockData?.results?.length === 0) && <div>Could not load stock data</div>}
            {stockData && <div className="flex flex-col w-full gap-4">
              {<StockDataTable stockData={stockData.results} />}
            </div>}
          </TabsContent>
          <TabsContent value="news">
            <div className="w-full m-auto p-4 text-center">Loading news...</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

