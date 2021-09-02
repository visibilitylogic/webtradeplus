import { format } from 'date-fns'

export const singleUserWithdrawal = [
  {
    Header: 'Ref',
    accessor: 'Ref',
  },
  {
    id: 'Date',
    Header: 'Created Date',
    accessor: 'time',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },
  {
    Header: 'Status',
    accessor: 'status',
    accessor: ({ status }) => (
      <p
        className={
          status === 'Pending'
            ? 'bg-danger text-light text-center'
            : 'bg-success text-light text-center '
        }
      >
        {status}
      </p>
    ),
  },

  {
    Header: 'Fees',
    accessor: 'fees',
  },
  {
    id: 'Wallet Received',
    Header: 'Amount',
    accessor: 'amount',
  },

  {
    Header: 'Currency',
    accessor: 'currency',
  },
  {
    Header: 'Total',
    accessor: 'total',
  },

  {
    Header: 'Action',
    accessor: 'action',
  },
]
