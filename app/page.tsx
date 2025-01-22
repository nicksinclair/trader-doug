'use client'

import Footer from '@/components/patterns/Footer'
import Navigation from '@/components/patterns/Navigation'
import Dashboard from '@/components/stocks/Dashboard'
// import StockDataForm from '@/components/stocks/StockDataForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div id="app-layout" className="grid grid-rows-layout h-screen">
        <Navigation />
        <div id="app-content" className="container mx-auto py-10 flex flex-col border-l border-r p-4 gap-4">
          {/* <StockDataForm /> */}
          <Dashboard />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  )
}