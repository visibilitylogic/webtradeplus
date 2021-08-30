import { format } from 'date-fns'
import ViewWithDrawalDetails from './ViewWithDrawalDetails'
import WithdrawalStatus from './WithdrawalStatus'
export const withdrawalHeader = [
  {
    id: 'Ref',
    Header: 'Ref',
    accessor: 'Ref',
  },

  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Withdrawal Method',
    accessor: 'method',
  },
  {
    Header: 'Withdrawal Info',
    accessor: 'withdrawInfo',
    Cell: <ViewWithDrawalDetails />,
  },

  {
    Header: 'Date',
    accessor: 'time',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },
  {
    id: 'Amount',
    Header: 'Amount',
    accessor: 'amount',
  },

  {
    Header: 'Total',
    accessor: 'total',
  },
  {
    id: 'Status',
    Header: 'Status',
    accessor: ({ status }) => (
      <p
        className={
          status === 'Pending'
            ? 'bg-danger text-light p-1  text-center'
            : 'bg-success text-light p-1  text-center '
        }
      >
        {status}
      </p>
    ),
  },
  {
    Header: 'Action',
    accessor: ({ status }) => <WithdrawalStatus status={status} />,
  },
]
