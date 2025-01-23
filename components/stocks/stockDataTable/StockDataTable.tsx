import { stockDataTableColumns } from '@/components/stocks/stockDataTable/StockDataTableColumns'
import { DataTable } from '@/components/ui/data-table'
import { Aggregate } from '@/types/stocks'

interface StockDataTableProps {
  stockData: Aggregate[]
}

export function StockDataTable({ stockData = [] }: StockDataTableProps) {
  return (
    <DataTable columns={stockDataTableColumns} data={stockData} />
  )
}

