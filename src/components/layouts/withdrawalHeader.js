import Witdrawal from './Witdrawal'
import { format } from 'date-fns'
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
    accessor: '',
  },
  {
    Header: 'Withdrawal Info',
    accessor: 'withdrawInfo',
    accessor: ({ withdrawInfo }) => <Witdrawal withdrawInfo={withdrawInfo} />,
  },
  {
    id: 'Date',
    Header: 'time',
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
]
