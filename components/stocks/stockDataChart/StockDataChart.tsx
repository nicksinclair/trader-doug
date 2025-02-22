'use client'

import { format } from 'date-fns'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import { stockDataChartConfig } from '@/components/stocks/stockDataChart/StockDataChartConfig'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { IAggs } from '@polygon.io/client-js'

interface StockDataChartProps {
  stockData: IAggs['results']
}

export function StockDataChart({ stockData = [] }: StockDataChartProps) {
  return (
    <ChartContainer config={stockDataChartConfig} className="min-h-[150px] w-full">
      <LineChart accessibilityLayer data={stockData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="t"
          tickLine={false}
          tickFormatter={(value) => format(new Date(value), 'P')}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="c"
          type="monotone"
          stroke="var(--color-c)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="h"
          type="monotone"
          stroke="var(--color-h)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="l"
          type="monotone"
          stroke="var(--color-l)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}