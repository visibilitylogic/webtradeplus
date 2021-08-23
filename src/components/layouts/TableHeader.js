//import { format } from 'date-fns'
import Moment from 'react-moment'
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
    accessor: 'estimatedBalance',
  },
  {
    id: 'autoTrade',
    Header: 'Auto Trade',
    accessor: (autoTrade) => (autoTrade.toString() ? 'Yes' : 'No'),
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
    id: 'notification',
    Header: 'Notifications Enabled',
    accessor: (notification) =>
      notification.isTrading.toString() ? 'Yes' : 'No',
  },
  {
    Header: 'Currency',
    accessor: 'currency',
  },
  {
    id: 'trading',
    Header: 'IsTrading',
    accessor: (d) => d.isTrading.toString(),
  },
]
