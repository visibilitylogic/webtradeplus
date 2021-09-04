import { format } from 'date-fns'
import SinglePayment from './SinglePayment'
export const paymentHeader = [
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
    Header: 'Method',
    accessor: 'method',
  },
  {
    id: 'Fees',
    Header: 'Fee',
    accessor: 'fee',
  },

  {
    Header: 'State',
    accessor: 'yourState',
  },
  {
    Header: 'Country',
    accessor: 'yourCountry',
  },
  {
    Header: 'Action',
    accessor: 'status',
    accessor: (status) => <SinglePayment status={status} />,
  },
]
