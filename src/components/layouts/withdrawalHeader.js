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
    // accessor: ({ withdrawInfo }) => <Witdrawal withdrawInfo={withdrawInfo} />,
  },
  {
    id: 'Date',
    Header: 'Time',
    // accessor: 'time',
    // Cell: ({ time }) => {
    //   return format(new Date(time), 'dd/MM/yyyy')
    // },
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
