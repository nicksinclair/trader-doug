'use client'

import { format } from 'date-fns'

import { Aggregate } from '@/types/stocks'
import { ColumnDef } from '@tanstack/react-table'

export const stockDataTableColumns: ColumnDef<Aggregate>[] = [
  {
    accessorKey: 't',
    header: 'Date',
    cell: ({ row }) => format(new Date(row.getValue('t')), 'P'),
  },
  {
    accessorKey: 'o',
    header: 'Open',
    cell: ({ row }) => `$${parseFloat(row.getValue('o')).toFixed(2)}`,
  },
  {
    accessorKey: 'c',
    header: 'Close',
    cell: ({ row }) => `$${parseFloat(row.getValue('o')).toFixed(2)}`,
  },
  {
    accessorKey: 'h',
    header: 'High',
    cell: ({ row }) => `$${parseFloat(row.getValue('o')).toFixed(2)}`,
  },
  {
    accessorKey: 'l',
    header: 'Low',
    cell: ({ row }) => `$${parseFloat(row.getValue('o')).toFixed(2)}`,
  },
  {
    accessorKey: 'v',
    header: 'Volume',
  },
]