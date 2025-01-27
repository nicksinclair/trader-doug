import { format, subDays } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DATE_RANGE_KEY } from '@/lib/queryKeys'
import { cn } from '@/lib/utils'
import { DateRange } from '@/types/dateRange'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const defaultDateRange: DateRange = {
  from: subDays(new Date(), 8),
  to: subDays(new Date(), 1),
}

export default function DateRangePicker() {
  const queryClient = useQueryClient()

  const { data: dateRange = defaultDateRange } = useQuery<DateRange>({
    queryKey: [DATE_RANGE_KEY],
    queryFn: () => defaultDateRange
  })

  const updateDateRange = (newDateRange: DateRange) => {
    queryClient.setQueryData([DATE_RANGE_KEY], (prev: DateRange) => ({
      ...prev,
      ...newDateRange,
    }))
  }

  const form = useForm({
    defaultValues: dateRange,
  })

  return (
    <Form {...form}>
      <div className="flex gap-4 w-full md:w-min">
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>From</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full md:w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'P')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date)
                      updateDateRange({ from: date })
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>To</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full md:w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'P')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date)
                      updateDateRange({ to: date })
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}