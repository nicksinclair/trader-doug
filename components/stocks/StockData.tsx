'use client'

import { format } from 'date-fns'

import { getAggregates, getTickerNews, Snapshots } from '@/app/api'
import DeltaBadge from '@/components/patterns/DeltaBadge'
import { StockDataChart } from '@/components/stocks/stockDataChart/StockDataChart'
import { StockDataTable } from '@/components/stocks/stockDataTable/StockDataTable'
import StockNewsArticle from '@/components/stocks/StockNewsArticle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DATE_RANGE_KEY, STOCK_DATA_KEY, TICKER_NEWS_KEY } from '@/lib/queryKeys'
import { useQuery } from '@tanstack/react-query'

import type { DateRange } from '@/types/dateRange'
interface StockDataProps {
  ticker: string
  snapshot?: NonNullable<Snapshots>[0]
}

export default function StockData({ ticker, snapshot }: StockDataProps) {
  const { data: dateRange } = useQuery<DateRange>({ queryKey: [DATE_RANGE_KEY] })

  const { data: stockData, isLoading: isLoadingStockData, isError: isErrorStockData } = useQuery({
    queryKey: [STOCK_DATA_KEY, ticker, JSON.stringify(dateRange)],
    queryFn: () => {
      try {
        return getAggregates({ ticker, ...dateRange })
      } catch (error) {
        console.error('Error fetching stock data:', error)
      }
    },
    enabled: !!dateRange?.from && !!dateRange?.to,
  })

  const { data: tickerNews, isLoading: isLoadingNews, isError: isErrorNews } = useQuery({
    queryKey: [TICKER_NEWS_KEY, ticker],
    queryFn: () => {
      try {
        return getTickerNews(ticker)
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    },
  })

  const { todaysChangePerc, updated } = snapshot ?? {}

  return (
    <div className="flex flex-col md:flex-row border-y">
      <div className="flex flex-row md:flex-col justify-between w-full md:w-[180px] p-4 md:border-r">
        <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-0">
          <h3 className="text-xl font-bold">{ ticker }</h3>
          {todaysChangePerc && (
            <DeltaBadge change={todaysChangePerc} />
          )}
        </div>
        {/* Updated date is in nanoseconds */}
        {updated && <div className="text-xs text-muted-foreground">
          Updated<br />
          {format(new Date(updated / 1000000), 'P h:mm a')}
        </div>}
      </div>
      <div className="w-full border-t md:border-none">
        <Tabs defaultValue="chart">
          <TabsList className="w-full">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
          <TabsContent value="chart">
            {isLoadingStockData && <div className="w-full m-auto p-4 text-center">Loading stock data...</div>}
            {isErrorStockData && <div className="w-full m-auto p-4 text-center">Could not load stock data</div>}
            {stockData?.results?.length === 0 && <div className="w-full m-auto p-4 text-center">No stock data to display</div>}
            {stockData && <div className="flex flex-col w-full px-2 py-4">
              {<StockDataChart stockData={stockData.results} />}
            </div>}
          </TabsContent>
          <TabsContent value="table">
            {isLoadingStockData && <div className="w-full m-auto p-4 text-center">Loading stock data...</div>}
            {isErrorStockData && <div className="w-full m-auto p-4 text-center">Could not load stock data</div>}
            {stockData?.results?.length === 0 && <div className="w-full m-auto p-4 text-center">No stock data to display</div>}
            {stockData && <div className="flex flex-col w-full gap-4">
              {<StockDataTable stockData={stockData.results} />}
            </div>}
          </TabsContent>
          <TabsContent value="news">
            {isLoadingNews && <div className="w-full m-auto p-4 text-center">Loading news...</div>}
            {isErrorNews && <div className="w-full m-auto p-4 text-center">Could not load news</div>}
            {tickerNews?.length === 0 && <div className="w-full m-auto p-4 text-center">No news to display</div>}
            {tickerNews && <div className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 w-full p-4 gap-4">
              {tickerNews.map((article, index) => <StockNewsArticle
                key={index}
                date={article.published_utc}
                image={article.image_url}
                publisher={article.publisher}
                title={article.title}
                url={article.article_url}
              />)}
            </div>}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

