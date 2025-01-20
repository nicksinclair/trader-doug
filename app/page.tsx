'use client'

import Dashboard from '@/components/stocks/Dashboard'
// import StockDataForm from '@/components/stocks/StockDataForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto py-10 flex flex-col gap-4">
        {/* <StockDataForm /> */}
        <Dashboard />
      </div>
    </QueryClientProvider>
  )
}