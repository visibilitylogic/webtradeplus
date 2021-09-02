import { format } from 'date-fns'
import SingleWithdrawal from './SingleWithdrawal'

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
    Header: 'Action',
    accessor: 'status',
    accessor: ({ status }) => <SingleWithdrawal status={status} />,
  },
]
