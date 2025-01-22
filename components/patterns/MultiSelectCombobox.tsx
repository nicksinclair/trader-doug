'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface MultiSelectComboboxProps {
  options: { label: string; value: string }[]
  placeholder?: string
  emptyMessage?: string
}

export function MultiSelectCombobox({
  options,
  placeholder = 'Select items...',
  emptyMessage = 'No item found.',
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<string[]>([])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedItems.length > 0 ? `${selectedItems.length} selected` : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search items..." />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  setSelectedItems((prev) =>
                    prev.includes(option.value)
                      ? prev.filter((item) => item !== option.value)
                      : [...prev, option.value],
                  )
                }}
              >
                <Checkbox
                  checked={selectedItems.includes(option.value)}
                  onCheckedChange={() => {
                    setSelectedItems((prev) =>
                      prev.includes(option.value)
                        ? prev.filter((item) => item !== option.value)
                        : [...prev, option.value],
                    )
                  }}
                />
                <span className="ml-2">{option.label}</span>
                <Check
                  className={cn('ml-auto h-4 w-4', selectedItems.includes(option.value) ? 'opacity-100' : 'opacity-0')}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}