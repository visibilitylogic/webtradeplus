import { format } from 'date-fns'
import ApproveDeposit from './ApproveDeposit'
import PaymentModal from './PaymentModal'
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
    accessor: '',
  },
  {
    Header: 'Payment Gateway',
    accessor: 'method',
  },
  {
    id: 'cryptoAddress',
    Header: 'Payment Details',
    // accessor: 'cryptoAddress',
    accessor: (cryptoAddress) => <PaymentModal cryptoAddress={cryptoAddress} />,
  },
  {
    Header: 'Status',
    accessor: ({ status }) => (
      <p
        className={
          status === 'Declined' || status === 'Pending'
            ? ' bg-danger text-light p-1 text-center'
            : 'bg-success text-light p-1 text-center'
        }
      >
        {status}
      </p>
    ),
  },
  {
    Header: 'Action',
    accessor: 'status',
    accessor: (status) => <ApproveDeposit status={status} />,
  },
]
