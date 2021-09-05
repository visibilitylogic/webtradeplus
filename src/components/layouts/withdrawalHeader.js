import { format } from 'date-fns'
import ViewWithDrawalDetails from './ViewWithDrawalDetails'
import Witdrawal from './Witdrawal'
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
    accessor: 'methodDetails',
    accessor: ({ methodDetails }) => {
      methodDetails.map((i, index) => <p key={index}>{i}</p>)
    },
  },
  {
    Header: 'Withdrawal Info',
    accessor: 'withdrawInfo',
    Cell: <ViewWithDrawalDetails />,
    //  ({ withdrawInfo }) => <Witdrawal withdrawInfo={withdrawInfo} />,
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
    id: 'Date',
    Header: 'Time',
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
    Header: 'Fees',
    accessor: 'fees',
  },
  {
    Header: 'Action',
    accessor: 'status',
    accessor: (status) => <Witdrawal status={status} />,
  },
]
