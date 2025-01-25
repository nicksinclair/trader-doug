import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'

interface StockNewsArticleProps {
  author?: string
  date: string
  image?: string
  publisher: {
    faviconUrl?: string;
    homepageUrl?: string;
    logoUrl?: string;
    name?: string;
  }
  title: string
  url?: string
}

interface ImageLoaderParams {
  src: string;
}

const imageLoader = ({ src }: ImageLoaderParams) => {
  return src
}

export default function StockNewsArticle({
  author,
  date,
  image,
  publisher,
  title,
  url = '',
}: StockNewsArticleProps) {
  return (
    <Link href={url} target="_blank" className="h-full">
      <Card className="flex flex-col h-full overflow-hidden">
        {image && <Image
          loader={imageLoader}
          src={image}
          alt={title}
          width={600}
          height={400}
          className="object-cover" />}
        <div className="flex flex-col p-4 gap-2">
          <CardHeader className="line-clamp-3">{title}</CardHeader>

          <CardDescription className="flex flex-row items-between gap-2">
            <span className="text-sm truncate">
              {author}
            </span>
            <span className="text-sm">
              {format(new Date(date), 'MMMM d, yyyy')}
            </span>
          </CardDescription>

          {publisher.name &&<CardFooter>
            <span className="text-sm truncate">
              {publisher.name}
            </span>
          </CardFooter>}
        </div>
      </Card>
    </Link>
  )
}