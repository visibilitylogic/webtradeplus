import { format } from 'date-fns'
export const bankTransferHeader = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    id: 'Ref',
    Header: 'Ref',
    accessor: ({ Ref }) => <strong> {Ref}</strong>,
  },
  {
    Header: 'Created Date',
    accessor: 'time',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },

  {
    Header: 'Currency',
    accessor: 'currency',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    id: 'status',
    Header: 'Status',
    accessor: ({ status }) => (
      <p
        className={
          status === 'Declined'
            ? 'text-center text-danger'
            : 'text-center text-success'
        }
      >
        {status}
      </p>
    ),
  },
  {
    Header: 'Bank Ref',
    accessor: '',
  },
  {
    Header: 'Proof Received',
    accessor: '',
  },
]
