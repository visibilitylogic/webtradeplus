import { format } from 'date-fns'
import ApproveDeposit from './ApproveDeposit'
import PaymentModal from './PaymentModal'
import DepositState from './DepositState'
export const depositHeader = [
  {
    id: 'Ref',
    Header: 'Ref',
    accessor: ({ Ref }) => <strong> {Ref}</strong>,
  },
  {
    id: 'name',
    Header: 'Name',
    accessor: 'name',
  },

  {
    id: 'time',
    Header: 'Created date',
    accessor: 'time',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },

  {
    Header: 'Amount Paid',
    accessor: ({ amount }) => <strong>{amount}</strong>,
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
    accessor: 'amount',
    accessor: ({ amount }) => amount,
  },
  {
    id: 'cryptoAddress',
    Header: 'Payment Gateway',
    accessor: 'cryptoAddress',
  },
  {
    Header: 'Payment Details',
    accessor: 'method',
    accessor: (method) => <PaymentModal method={method} />,
  },
  {
    Header: 'Status',
    accessor: 'status',
    accessor: ({ status }) => <DepositState status={status} />,
  },
  {
    Header: 'Action',
    accessor: 'status',
    accessor: (status) => <ApproveDeposit status={status} />,
  },
]
