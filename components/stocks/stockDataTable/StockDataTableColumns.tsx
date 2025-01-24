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
    cell: ({ row }) => formatCurrency(parseFloat(row.getValue('o'))),
  },
  {
    accessorKey: 'c',
    header: 'Close',
    cell: ({ row }) => formatCurrency(parseFloat(row.getValue('c'))),
  },
  {
    accessorKey: 'h',
    header: 'High',
    cell: ({ row }) => formatCurrency(parseFloat(row.getValue('h'))),
  },
  {
    accessorKey: 'l',
    header: 'Low',
    cell: ({ row }) => formatCurrency(parseFloat(row.getValue('l'))),
  },
  {
    accessorKey: 'v',
    header: 'Volume',
    cell: ({ row }) => parseInt(row.getValue('v')).toLocaleString(),
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}