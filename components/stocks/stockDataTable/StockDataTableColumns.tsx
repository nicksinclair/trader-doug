'use client'

import { format } from 'date-fns'

import { IAggs } from '@polygon.io/client-js'
import { ColumnDef } from '@tanstack/react-table'

export const stockDataTableColumns: ColumnDef<NonNullable<IAggs['results']>[number]>[] = [
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