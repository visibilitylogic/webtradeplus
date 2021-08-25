//import { format } from 'date-fns'
import Moment from 'react-moment'
import ChangeAutoTrade from './ChangeAutoTrade'
import OnlineUser from './OnlineUser'

export const Columns = [
  {
    id: 'name',
    Header: 'First Name',
    accessor: 'name',
    // ) => <OnlineUser name={name} />,
    // ,
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
    accessor: 'estimatedBalance',
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
]
