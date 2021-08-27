import React from 'react'
import { format } from 'date-fns'
export const tradeApprovalHeader = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    id: 'Email',
    Header: 'email',
    accessor: 'email',
  },
  {
    Header: 'Asking Date',
    accessor: 'time',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },

  {
    Header: 'Trades',
    accessor: 'trades',
  },
  {
    Header: 'Rebalance',
    accessor: 'rebalance',
  },
  {
    id: 'status',
    Header: 'Status',
    accessor: ({ status }) => (
      <p
        className={
          status === 'Declined'
            ? 'text-center  bg-danger text-danger'
            : 'text-center bg-success text-success'
        }
      >
        {status}
      </p>
    ),
  },
]
