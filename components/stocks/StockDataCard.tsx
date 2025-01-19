'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StockDataCardProps {
  ticker: string
//   open: number
//   close: number
}

export default function StockDataCard(props: StockDataCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ props.ticker }</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Date</div>
            <div>{format(new Date(props.t), 'PPP')}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Open</div>
            <div>${props.o.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Close</div>
            <div>${props.c.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Volume</div>
            <div>{props.v.toLocaleString()}</div>
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}

