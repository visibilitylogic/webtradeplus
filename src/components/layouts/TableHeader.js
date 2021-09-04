import { format } from 'date-fns'
import Moment from 'react-moment'
import ChangeAutoTrade from './ChangeAutoTrade'

export const Columns = [
  {
    Header: 'First Name',
    accessor: 'name',
  },
  {
    Header: 'Last Name',
    accessor: 'lastname',
  },

  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber',
  },

  {
    Header: 'Balance',
    accessor: 'wallet',
  },
  {
    id: 'autoTrade',
    Header: 'Auto Trade',
    accessor: (autoTrade) => <ChangeAutoTrade autoTrade={autoTrade} />,
  },
  {
    id: 'updatedAt',
    Header: 'Time',
    accessor: 'time',
    accessor: (d) => (
      <Moment fromNow ago>
        {d}
      </Moment>
    ),
  },
  {
    Header: 'Currency',
    accessor: 'currency',
  },
  {
    Header: 'Last Login',
    accessor: 'time',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },
]
