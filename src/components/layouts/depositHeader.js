import { format } from 'date-fns'
import PaymentModal from './PaymentModal'
export const depositHeader = [
  {
    id: 'name',
    Header: 'User',
    accessor: 'name',
  },

  {
    id: 'Ref',
    Header: 'Ref',
    accessor: ({ Ref }) => <strong> {Ref}</strong>,
  },
  {
    //id: 'time',
    Header: 'Created date',
    accessor: 'time',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },
  {
    Header: 'Status',
    accessor: ({ status }) => (
      <p
        className={
          status === 'Declined'
            ? ' bg-danger text-light p-2 text-center'
            : 'bg-success text-light p-2 text-center'
        }
      >
        {status}
      </p>
    ),
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
  // {
  //   Header: 'Validate',
  //   accessor: 'status',
  //   accessor: (status) => <DepositStatus status={status} />,
  // },
  // {
  //   Header: 'Cancel',
  //   accessor: 'status',
  //   accessor: (status) => <DepositCancel status={status} />,
  // },
]
