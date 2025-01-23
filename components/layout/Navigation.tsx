import { ChartNoAxesCombined, Github } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Navigation() {
  return (
    <div className="sticky top-0 border-b backdrop-blur-md">
      <nav className="flex items-center justify-between container w-full mx-auto p-4 gap-4 border-x">
        <div className="flex flex-row items-center gap-4">
          <ChartNoAxesCombined />
          <div>
          trader-doug
          </div>
        </div>
        <Button variant={'ghost'} size="icon" asChild>
          <Link href="https://github.com/nicksinclair/trader-doug">
            <Github />
          </Link>
        </Button>
      </nav>
    </div>
  )
}