import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <div className="sticky top-0 bg-white border-t">
      <nav className="flex items-center justify-between container w-full mx-auto p-4 gap-4 border-x">
        <div>
          Created by Nick Sinclair
        </div>
        <div className="flex gap-4">
          <Button variant="link" asChild>
            <Link href="https://github.com/nicksinclair">
            GitHub
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="https://github.com/nicksinclair">
            Website
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  )
}