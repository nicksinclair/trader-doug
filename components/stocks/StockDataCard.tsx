'use client'

import { format } from 'date-fns'

import { getAggregates } from '@/app/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'

interface StockDataCardProps {
  ticker: string
}

export default function StockDataCard(props: StockDataCardProps) {
  const { data: stockData, isLoading, isError } = useQuery({
    queryKey: ['stockData', props.ticker],
    queryFn: () => getAggregates({ ticker: props.ticker }),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ props.ticker }</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading && <div>Loading...</div>}
        {(isError || stockData?.results?.length === 0) && <div>Could not load stock data</div>}
        {stockData?.results?.map((result) => (
          <Card key={result.t}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Date</div>
                  <div>{format(new Date(result.t), 'PPP')}</div>
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

