import { format } from "date-fns";
import ViewWithDrawalDetails from "./ViewWithDrawalDetails";
import WithdrawalStatus from "./WithdrawalStatus";
export const withdrawalHeader = [
  {
    field: "Ref",
    width: 120,
    headerName: "Ref",
    accessor: "Ref",
  },

  {
    field: "name",
    width: 120,
    headerName: "Name",
    accessor: "name",
  },
  {
    field: "email",
    width: 120,
    type: "email",
    headerName: "Email",
    accessor: "email",
  },
  {
    field: "method",
    width: 120,
    headerName: "Withdrawal Method",
    accessor: "method",
  },
  {
    field: "Withdrawal Info",
    width: 120,
    headerName: "Withdrawal Info",
    accessor: "withdrawInfo",
    renderCell: () => {
      return <ViewWithDrawalDetails />;
    },
  },

  {
    field: "time",
    width: 120,
    headerName: "Date",
    accessor: "time",
    type: "time",
    // Cell: ({ value }) => {
    //   return format(new Date(value), "dd/MM/yyyy");
    // },
  },
  {
    field: "amount",
    width: 120,
    type: "number",
    headerName: "Amount",
    accessor: "amount",
  },

  {
    field: "total",
    width: 120,
    headerName: "Total",
    accessor: "total",
  },
  {
    field: "status",
    width: 120,
    headerName: "Status",
    renderCell: (props) => {
      <p
        className={
          props.row.status === "Pending"
            ? "bg-danger text-light p-1  text-center"
            : "bg-success text-light p-1  text-center "
        }
      >
        {console.log(`props`, props)}
        {props.row.status}
      </p>;
    },
    // accessor: ({ status }) => (
    //   <p
    //     className={
    //       status === "Pending"
    //         ? "bg-danger text-light p-1  text-center"
    //         : "bg-success text-light p-1  text-center "
    //     }
    //   >
    //     {status}
    //   </p>
    // ),
  },
  {
    field: "status",
    width: 120,
    headerName: "Action",
    renderCell: (props) => {
      return <WithdrawalStatus status={props.row.status} />;
    },
    // accessor: ({ status }) =>
  },
];
