import { format } from 'date-fns'
export const paymentHeader = [
  {
    id: 'User',
    Header: 'User',
    accessor: 'user',
  },

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
    accessor: 'satus',
  },
  {
    Header: 'Amount Paid',
    accessor: '',
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
    Header: 'Amount Recieved',
    accessor: '',
  },
  
  {
    Header: 'Payment Gateway',
    accessor: '',
  },
  {
    Header: 'Proof',
    accessor: '',
  },
  {
    Header: 'Action',
    accessor: '',
  },
]
