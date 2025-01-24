import { stockDataTableColumns } from '@/components/stocks/stockDataTable/StockDataTableColumns'
import { DataTable } from '@/components/ui/data-table'
import { IAggs } from '@polygon.io/client-js'

interface StockDataTableProps {
  stockData: IAggs['results']
}

export function StockDataTable({ stockData = [] }: StockDataTableProps) {
  const sortedStockData = stockData.sort((a, b) => new Date(b.t ?? 0).getTime() - new Date(a.t ?? 0).getTime())

  return (
    <DataTable columns={stockDataTableColumns} data={sortedStockData} />
  )
}

