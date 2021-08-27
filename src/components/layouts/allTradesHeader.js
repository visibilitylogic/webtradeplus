import { format } from 'date-fns'
export const allTradesHeader = [
  {
    Header: 'Ref',
    accessor: 'Ref',
  },
  {
    Header: 'active',
    accessor: 'active',
  },

  {
    Header: 'Order Date',
    accessor: '',
  },
  {
    //id: 'time',
    Header: 'Exchange',
    accessor: 'buyW',
  },
  {
    Header: 'type',
    accessor: 'tag',
    accessor: ({ tag }) => (
      <p
        className={
          tag === 'buy' ? ' bg-danger text-light' : ' bg-success text-light'
        }
      >
        {tag}
      </p>
    ),
  },
  {
    Header: 'Amount',
    accessor: 'stockAmount',
  },
  {
    Header: 'Total',
    accessor: 'total',
  },

  {
    id: 'Wallet Received',
    Header: 'Wallet Received',
    accessor: 'unit',
  },

  {
    Header: 'Profit',
    accessor: 'profit',
  },
  {
    Header: 'Loss',
    accessor: 'loss',
  },
  {
    Header: 'Payment Details',
    accessor: 'cryptoAddress',
  },
  {
    Header: 'Time',
    accessor: 'time',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },
]
