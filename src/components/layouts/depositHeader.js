import { format } from "date-fns";
import ApproveDeposit from "./util/DepositComponent";

// import ApproveDeposit from "./ApproveDeposit";
// import PaymentModal from "./PaymentModal";
// import DepositState from "./DepositState";

export const depositHeader = [
  {
    id: "Ref",
    field: "Ref",
    headerName: "Ref",
    accessor: "Ref",
    width: 180,
    type: "text",
    // headerAlign: "center",
    // accessor: ({ Ref }) => <strong> {Ref}</strong>,
  },
  {
    id: "name",
    field: "name",
    headerName: "Name",
    type: "text",
    // headerAlign: "center",
    width: 180,
    accessor: "name",
  },

  {
    id: "time",
    field: "time",
    headerName: "Created date",
    type: "date",
    // headerAlign: "center",
    width: 180,
    accessor: "time",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },

  {
    field: "amount",
    headerName: "Amount Paid",
    type: "number",
    // headerAlign: "center",
    width: 180,
    accessor: "amount",
    // accessor: ({ amount }) => <strong>{amount}</strong>,
  },
  {
    id: "Fee",
    field: "fee",
    headerName: "Fee",
    type: "number",
    // headerAlign: "center",
    width: 180,
    accessor: "fee",
  },

  {
    id: "Wallet Received",
    field: "__v",
    headerName: "Wallet Received",
    type: "date",
    // headerAlign: "center",
    width: 180,
    accessor: "__v",
  },

  {
    field: "amount",
    headerName: "Amount Received",
    accessor: "amount",
    type: "number",
    // headerAlign: "center",
    width: 180,
    // accessor: ({ amount }) => amount,
  },
  {
    id: "cryptoAddress",
    field: "method",
    headerName: "Payment Gateway",
    type: "text",
    // headerAlign: "center",
    width: 180,
    accessor: "method",
  },
  {
    field: "method",
    headerName: "Payment Details",
    type: "text",
    // headerAlign: "center",
    width: 180,
    // accessor: (method) => <PaymentModal method={method} />,
    accessor: "method",
  },
  {
    field: "status",
    headerName: "Status",
    type: "text",
    // headerAlign: "center",
    width: 180,
    backgroundColor: "green",
    renderCell: (props) => {
      return (
        <p
          style={{
            backgroundColor: props.row.status === "Approved" ? "green" : "red",
            border: "none",
            width: "100%",
            textAlign: "center",
          }}
        >
          {props.row.status}
        </p>
      );
    },
    // accessor: ({ status }) => <DepositState status={status} />,
    accessor: "status",
  },
  {
    field: "action",
    headerName: "Action",
    width: 180,
    // accessor: (status) => <ApproveDeposit status={status} />,
    accessor: "status",
    renderCell: (props) => {
      console.log(`props`, props);
      return <ApproveDeposit details={props.row} />;
    },
  },
];
