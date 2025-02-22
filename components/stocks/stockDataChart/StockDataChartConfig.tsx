import { ChartConfig } from '@/components/ui/chart'

export const stockDataChartConfig: ChartConfig = {
  c: {
    label: 'Close',
    color: 'hsl(var(--chart-1))',
  },
  h: {
    label: 'High',
    color: 'hsl(var(--chart-2))',
  },
  l: {
    label: 'Low',
    color: 'hsl(var(--chart-3))',
  },
}