import { format } from 'date-fns'
export const allVerifiedUsersHeader = [
  {
    Header: 'User',
    accessor: 'name',
  },
  {
    Header: 'Submitted Date',
    accessor: 'time',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },

  {
    Header: 'Status',
    accessor: 'status',
  },
  //   {
  //     Header: 'Verify User',
  //     accessor: 'status',
  //   },
  //   {
  //     Header: 'Decline',
  //     accessor: 'status',
  //   },
  {
    //id: 'time',
    Header: 'document File',
    accessor: 'documentFile',
  },
  {
    Header: 'Documents',
    accessor: 'proofDocument',
  },
  {
    Header: 'Document Name',
    accessor: 'documentName',
  },
]
