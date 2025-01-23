'use client'

import Dashboard from '@/components/layout/Dashboard'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div id="app-layout" className="grid grid-rows-layout min-h-screen">
        <Navigation />
        <div id="app-content" className="bg-white container mx-auto py-10 flex flex-col border-l border-r gap-4">
          <Dashboard />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  )
}