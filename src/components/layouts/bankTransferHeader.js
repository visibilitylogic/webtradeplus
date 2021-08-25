import { format } from "date-fns";

export const bankTransferHeader = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Ref',
    accessor: 'Ref',
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
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Bank Ref',
    accessor: 'status',
  },
  {
    Header: 'Proof Received',
    accessor: 'status',
  },
  {
    Header: 'Processed',
    accessor: 'status',
  },
]