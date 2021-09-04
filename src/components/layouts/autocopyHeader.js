import { format } from 'date-fns'
export const autocopyHeader = [
  {
    Header: 'Market',
    accessor: 'market',
  },
  {
    id: 'Date',
    Header: 'Created Date',
    accessor: 'date',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },

  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'P/L',
    accessor: 'profitLoss',
  },

  {
    Header: 'Current Balance',
    accessor: 'currentBalance',
  },
  //   {
  //     Header: "Action",
  //     accessor: 'status',
  //     accessor: ({ status }) => (
  //       <p
  //         className={
  //           status === 'Pending'
  //             ? 'bg-danger text-light   text-center'
  //             : 'bg-success text-light   text-center '
  //         }
  //       >
  //         {status}
  //       </p>
  //     ),
  //   },
]
