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
          tag === 'buy'
            ? ' text-center bg-danger text-light'
            : ' text-center bg-success text-light'
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
    Header: 'Profit/Loss',
    accessor: 'profit',
  },
  {
    Header: 'Take Profit',
    accessor: 'takeProfit',
  },
  {
    Header: 'Name Of Assest',
    accessor: 'nameOfAsset',
  },
  {
    Header: 'Type Of Assest',
    accessor: 'typeOfAsset',
  },
  {
    Header: 'Open Rate Of Assest',
    accessor: 'openRateOfAssest',
  },
  {
    Header: 'Close Rate Of Assest',
    accessor: 'closeRateOfAssest',
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
