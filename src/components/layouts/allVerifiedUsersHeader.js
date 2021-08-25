import { format } from 'date-fns'
import AllUser from './AllUser.js'
import DocumentFile from './DocumentFile.js'
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

    accessor: ({ status }) => (
      <p
        className={
          status === 'Pending'
            ? 'bg-danger text-light p-2 text-center'
            : 'bg-success text-light p-2 text-center '
        }
      >
        {status}
      </p>
    ),
  },

  {
    id: 'documentFile',
    Header: 'Identity Info',
    accessor: ({ documentFile }) => (
      <DocumentFile documentFile={documentFile} />
    ),
  },
  {
    Header: 'Documents',
    accessor: (proofDocument) => (
      <AllUser proofDocument={proofDocument} />
      // <div className="d-flex justify-content-center align-items-center"></div>
    ),
  },
  {
    Header: 'Approval',
    accessor: '',
  },
]
