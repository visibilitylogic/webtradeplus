import { format } from 'date-fns'
import AllUser from './AllUser.js'
import DocumentFile from './DocumentFile.js'
import ApproveDoc from './ApproveDoc'
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
            ? 'bg-danger text-light  text-center'
            : 'bg-success text-light  text-center '
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
    Header: 'Action',
    accessor: (status) => <ApproveDoc status={status} />,
  },
]
