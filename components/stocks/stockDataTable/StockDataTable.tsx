import { stockDataTableColumns } from '@/components/stocks/stockDataTable/StockDataTableColumns'
import { DataTable } from '@/components/ui/data-table'
import { IAggs } from '@polygon.io/client-js'

interface StockDataTableProps {
  stockData: IAggs['results']
}

export function StockDataTable({ stockData = [] }: StockDataTableProps) {
  return (
    <DataTable columns={stockDataTableColumns} data={stockData} />
  )
}

