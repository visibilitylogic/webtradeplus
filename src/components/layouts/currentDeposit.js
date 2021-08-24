import { format } from 'date-fns'
export const currentDeposit = [
  {
    Header: 'User',
    accessor: '_id',
  },
  {
    Header: 'Submitted Date',
    accessor: 'time',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },

  {
    Header: 'Amount',
    accessor: 'amount',
  },
]
