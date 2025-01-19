'use client'

import StockDataForm from '@/components/stocks/StockDataForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Dashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <StockDataForm />
    </QueryClientProvider>
  )
}