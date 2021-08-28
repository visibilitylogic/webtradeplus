import { format } from 'date-fns'
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
    accessor: ({ status }) => {
      return status === 'Pending' || status === 'Declined' ? (
        <div className="d-flex flex-column">
          <a
            className="text-light text-center bg-success mb-2"
            onClick={() => alert(123)}
          >
            Accept
          </a>
          <a className="text-light text-center bg-danger">Decline</a>
        </div>
      ) : null
    },
  },
]
