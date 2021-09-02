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
  // {
  //   maxWidth: 30,
  //   minWidth: 10,
  //   width: 20,
  //   id:"online",
  //   Header: 'online',
  //   accessor: 'isOnline',
  //   accessor: ({ isOnline }) => (
  //     <span style={{width:"20px", height:"20px", borderRadius:"50%",}}
  //       className={
  //         isOnline ? ' bg-success '
  //           : ' bg-danger'
  //       }
  //     >edf</span>
  
  //   ),
  // },
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
