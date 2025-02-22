'use client'

import { format } from 'date-fns'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { stockDataChartConfig } from '@/components/stocks/stockDataChart/StockDataChartConfig'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { formatCurrency } from '@/lib/utils'
import { IAggs } from '@polygon.io/client-js'

interface StockDataChartProps {
  stockData: IAggs['results']
}

export function StockDataChart({ stockData = [] }: StockDataChartProps) {
  const flatData = stockData.flatMap((item) => [item.c, item.h, item.l]).filter((item) => item !== undefined)
  const [dataMin, dataMax] = [Math.min(...flatData), Math.max(...flatData)]
  const roundedDataMin = Math.floor((dataMin - 0.01 * dataMin) / 10) * 10
  const roundedDataMax = Math.ceil((dataMax + 0.01 * dataMax) / 10) * 10

  return (
    <ChartContainer config={stockDataChartConfig} className="min-h-[120px] max-h-[300px] w-full ">
      <AreaChart
        accessibilityLayer
        data={stockData}
        margin={{
          left: 12,
          right: 4,
        }}>
        <CartesianGrid vertical={false} strokeDasharray="4" />
        <XAxis
          dataKey="t"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => format(new Date(value), 'MM/dd')}
        />
        <YAxis
          type="number"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => formatCurrency(parseFloat(value))}
          domain={[roundedDataMin, roundedDataMax]}
          allowDataOverflow={true}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              indicator="line"
              formatter={(value, name) => {
                let formattedValue = value
                if (typeof value === 'number') {
                  formattedValue = formatCurrency(value)
                } else if (typeof value === 'string') {
                  formattedValue = formatCurrency(parseFloat(value))
                }

                return (
                  <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                    {stockDataChartConfig[name as keyof typeof stockDataChartConfig]?.label || name}
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                      {formattedValue}
                    </div>
                  </div>
                )
              }}
            />
          }
        />
        <defs>
          <linearGradient id="fillClose" gradientUnits="userSpaceOnUse" x1="0" y1={0} x2="0" y2={300}>
            <stop offset="5%" stopColor="var(--color-c)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-c)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillHigh" gradientUnits="userSpaceOnUse" x1="0" y1={0} x2="0" y2={300}>
            <stop offset="5%" stopColor="var(--color-h)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-h)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillLow" gradientUnits="userSpaceOnUse" x1="0" y1={0} x2="0" y2={300}>
            <stop offset="5%" stopColor="var(--color-l)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-l)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="c"
          type="natural"
          fill="url(#fillClose)"
          fillOpacity={0.3}
          stroke="var(--color-c)"
          strokeWidth={2}
          stackId="a"
        />
        <Area
          dataKey="h"
          type="natural"
          fill="url(#fillHigh)"
          fillOpacity={0.3}
          stroke="var(--color-h)"
          strokeWidth={2}
          stackId="b"
        />
        <Area
          dataKey="l"
          type="natural"
          fill="url(#fillLow)"
          fillOpacity={0.3}
          stroke="var(--color-l)"
          strokeWidth={2}
          stackId="c"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}