'use client'

import { format } from 'date-fns'

import { getAggregates } from '@/app/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DATE_RANGE_KEY } from '@/lib/queryKeys'
import { useQuery } from '@tanstack/react-query'

import type { DateRange } from '@/types/dateRange'

interface StockDataCardProps {
  ticker: string
}

export default function StockDataCard({ ticker }: StockDataCardProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>{ ticker }</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading && <div>Loading...</div>}
        {(isError || stockData?.length === 0) && <div>Could not load stock data</div>}
        {stockData?.map((result) => (
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
      </CardContent>
    </Card>
  )
}

