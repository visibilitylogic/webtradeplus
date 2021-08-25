import { DepositStatus, DepositCancel } from './DepositStatus'
import { format } from 'date-fns'
export const depositHeader = [
  {
    id: '',
    Header: 'User',
    accessor: 'name',
  },

  {
    Header: 'Ref',
    accessor: 'Ref',
  },
  {
    //id: 'time',
    Header: 'Created Date',
    accessor: 'time',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Amount Paid',
    accessor: 'amount',
  },
  {
    id: 'Fee',
    Header: 'Fee',
    accessor: 'fee',
  },

  {
    id: 'Wallet Received',
    Header: 'Wallet Received',
    accessor: '__v',
  },

  {
    Header: 'Amount Received',
    accessor: '_id',
  },
  {
    Header: 'Payment Gateway',
    accessor: 'method',
  },
  {
    Header: 'Payment Details',
    accessor: 'cryptoAddress',
  },
  {
    Header: 'Validate',
    accessor: 'status',
    accessor: (status) => <DepositStatus status={status} />,
  },
  {
    Header: 'Cancel',
    accessor: 'status',
    accessor: (status) => <DepositCancel status={status} />,
  },
]
