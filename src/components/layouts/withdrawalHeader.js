import { format } from "date-fns";
import ViewWithDrawalDetails from "./ViewWithDrawalDetails";
import WithdrawalStatus from "./WithdrawalStatus";
export const withdrawalHeader = [
  {
    field: "Ref",
    width: 180,
    headerName: "Ref",
    accessor: "Ref",
  },

  {
    field: "name",
    width: 180,
    headerName: "Name",
    accessor: "name",
  },
  {
    field: "email",
    width: 180,
    type: "email",
    headerName: "Email",
    accessor: "email",
  },
  {
    field: "method",
    width: 180,
    headerName: "Withdrawal Method",
    accessor: "method",
  },
  {
    field: "Withdrawal Info",
    width: 180,
    headerName: "Withdrawal Info",
    accessor: "withdrawInfo",
    renderCell: () => {
      return <ViewWithDrawalDetails />;
    },
  },

  {
    field: "time",
    width: 180,
    headerName: "Date",
    accessor: "time",
    type: "time",
    // Cell: ({ value }) => {
    //   return format(new Date(value), "dd/MM/yyyy");
    // },
  },
  {
    field: "amount",
    width: 180,
    type: "number",
    headerName: "Amount",
    accessor: "amount",
  },

  {
    field: "total",
    width: 180,
    headerName: "Total",
    accessor: "total",
  },
  {
    field: "status",
    width: 180,
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
    width: 180,
    headerName: "Action",
    renderCell: (props) => {
      return <WithdrawalStatus status={props.row.status} />;
    },
    // accessor: ({ status }) =>
  },
];
