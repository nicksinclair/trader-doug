'use client'

import { ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface MultiSelectComboboxProps {
  options: { label: string; value: string }[]
  defaultSelected?: string[]
  disabled?: boolean
  emptyMessage?: string
  placeholder?: string
  onChange?: (selectedItems: string[]) => void
}

export function MultiSelectCombobox({
  options = [],
  defaultSelected = [],
  disabled = false,
  emptyMessage = 'No item found.',
  placeholder = 'Select items...',
  onChange,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>(defaultSelected)

  // The default items may not be available on the first render.
  // In that case, disable the combobox instance until the default items are available.
  useEffect(() => {
    setSelectedItems(defaultSelected)
  }, [defaultSelected])

  const handleSelectionChange = (value: string) => {
    const updatedItems = selectedItems.includes(value) ? selectedItems.filter((item) => item !== value) : [...selectedItems, value]

    setSelectedItems(updatedItems)

    if (onChange) {
      onChange(updatedItems)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between">
          {selectedItems.length > 0 ? `${selectedItems.length} selected` : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search items..." />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelectionChange(option.value)}
                >
                  <Checkbox
                    checked={selectedItems.includes(option.value)}
                    onCheckedChange={() => handleSelectionChange(option.value)}
                  />
                  <span className="ml-2">{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}