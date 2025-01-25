import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'

interface DeltaBadgeProps {
  change: number
}

export default function DeltaBadge({ change }: DeltaBadgeProps) {
  return (
    <div>
      {change > 0 ? <ArrowUpRight /> : <ArrowDownRight />}
      <div className={cn(
        'w-min px-3 py-1 text-sm rounded-full',
        change > 0 ? 'bg-green-200' : 'bg-red-200'
      )}>
        <span className="ml-1">
          {change > 0 && '+'}{change.toFixed(2)}%
        </span>
      </div>
    </div>
  )
}