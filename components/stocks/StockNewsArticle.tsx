import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardDescription, CardHeader } from '@/components/ui/card'

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
  width: number;
  quality?: number;
}

const imageLoader = ({ src, width, quality }: ImageLoaderParams) => {
  const params = new URLSearchParams({
    width: width.toString(),
    ...(quality && { quality: quality.toString() }),
  })
  return `${src}?${params.toString()}`
}

export default function StockNewsArticle({
  date,
  image,
  publisher,
  title,
  url = '',
}: StockNewsArticleProps) {
  return (
    <Link href={url} target="_blank" className="h-full">
      <Card className="flex flex-col h-full overflow-hidden hover:bg-muted">
        {image && <Image
          loader={imageLoader}
          src={image}
          alt={title}
          width={450}
          height={300}
          className="object-cover" />}
        <div className="flex flex-col justify-between h-full p-4 gap-2 border-t">
          <CardHeader className="line-clamp-3">{title}</CardHeader>

          <CardDescription className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
            {publisher.name && <span className="text-sm truncate">
              {publisher.name}
            </span>}
            <span className="text-sm">
              {format(new Date(date), 'MMMM d, yyyy')}
            </span>
          </CardDescription>
        </div>
      </Card>
    </Link>
  )
}