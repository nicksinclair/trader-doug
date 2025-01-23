'use client'

import { format } from 'date-fns'

import { getAggregates } from '@/app/api'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DATE_RANGE_KEY } from '@/lib/queryKeys'
import { useQuery } from '@tanstack/react-query'

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
      <Separator orientation='vertical' />
      {isLoading && <div>Loading...</div>}
      {(isError || stockData?.results?.length === 0) && <div>Could not load stock data</div>}
      <div className="flex flex-col w-full p-4 gap-4">
        {stockData?.results?.map((result) => (
          <Card key={result.t}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Date</div>
                  <div>{format(new Date(result.t), 'P')}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Open</div>
                  <div>${result.o.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Close</div>
                  <div>${result.c.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Volume</div>
                  <div>{result.v.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

