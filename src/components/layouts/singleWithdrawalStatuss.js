import { format } from 'date-fns'
import SingleWithdrawal from './SingleWithdrawal'

export const singleUserWithdrawal = [
  {
    Header: 'Ref',
    accessor: 'Ref',
  },
  {
    Header: 'Created Date',
    accessor: 'time',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },
  {
    // id: 'status',
    Header: 'Status',
    accessor: ({ status }) => (
      <p
        className={
          status === 'Pending' || status === 'Declined'
            ? 'bg-danger text-light   text-center'
            : 'bg-success text-light   text-center '
        }
      >
        {status}
      </p>
    ),
  },
  {
    Header: 'Amount Paid',
    accessor: 'amount',
  },
  {
    Header: 'Fees',
    type: 'number',
    accessor: 'fees',
  },

  {
    Header: 'Payment Gateway',
    accessor: 'PaymentGateway',
  },

  {
    Header: 'Action',
    accessor: 'status',
    accessor: (status) => <SingleWithdrawal status={status} />,
  },
]
