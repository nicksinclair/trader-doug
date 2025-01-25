'use client'

import { getAggregates, getTickerNews } from '@/app/api'
import { StockDataTable } from '@/components/stocks/stockDataTable/StockDataTable'
import StockNewsArticle from '@/components/stocks/StockNewsArticle'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DATE_RANGE_KEY } from '@/lib/queryKeys'
import { useQuery } from '@tanstack/react-query'

import type { DateRange } from '@/types/dateRange'
interface StockDataProps {
  ticker: string
}

export default function StockData({ ticker }: StockDataProps) {
  const { data: dateRange } = useQuery<DateRange>({ queryKey: [DATE_RANGE_KEY] })

  const { data: stockData, isLoading: isLoadingStockData, isError: isErrorStockData } = useQuery({
    queryKey: ['stockData', ticker, JSON.stringify(dateRange)],
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
    queryKey: ['news', ticker],
    queryFn: () => {
      try {
        return getTickerNews(ticker)
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    },
  })

  return (
    <div className="flex flex-row border-y">
      <h3 className="text-xl font-bold w-[180px] p-4">{ ticker }</h3>
      <Separator orientation="vertical" />
      <div className="w-full">
        <Tabs defaultValue="table">
          <TabsList className="w-full">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
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
            {tickerNews && <div className="grid grid-cols-3 w-full p-4 gap-4">
              {tickerNews.map((article, index) => <StockNewsArticle
                key={index}
                author={article.author}
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

