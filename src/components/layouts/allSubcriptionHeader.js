import { format } from 'date-fns'
export const allSubcriptionHeader = [
  {
    Header: 'Name',
    accessor: 'user',
  },
  {
    id: 'Date of SUbscription',
    Header: 'email',
    accessor: 'email',
  },
  {
    Header: 'Number of Days',
    accessor: 'time',
    // Cell: ({ value }) => {
    //   return format(new Date(value), 'dd/MM/yyyy')
    // },
  },

  {
    Header: 'Subscriptin Expire in',
    accessor: 'trades',
  },
  {
    Header: 'Type Payment',
    accessor: 'rebalance',
  },
  {
    Header: 'Subscription Expire In',
    accessor: 'sub',
  },
  {
    Header: 'Type Payment',
    accessor: 'sub',
  },
  {
    Header: 'Type Payment',
    accessor: 'typePayment',
  },
  {
    Header: 'Charge Info',
    accessor: 'chargeInfo',
  },
  {
    id: 'status',
    Header: 'Subscription Expire In',
  },
]
