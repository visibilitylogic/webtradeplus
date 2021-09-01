import { format } from "date-fns";
import ApproveDeposit from "./ApproveDeposit";
import PaymentModal from "./PaymentModal";
import DepositState from "./DepositState";

const checkIfApproved = (status) => {
  return status === "Approved" ? "none" : "block";
};
export const depositHeader = [
  {
    id: "Ref",
    field: "Ref",
    headerName: "Ref",
    accessor: "Ref",
    width: 180,
    type: "text",
    // headerAlign: "center",
    accessor: ({ Ref }) => <strong> {Ref}</strong>,
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
    accessor: ({ amount }) => <strong>{amount}</strong>,
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
    renderCell: (cellValues) => {
      return (
        <button
          style={{
            backgroundColor:
              cellValues.row.status === "Approved" ? "green" : "red",
            border: "none",
            width: "100%",
          }}
        >
          {cellValues.row.status}
        </button>
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
      return (
        <div style={{ display: checkIfApproved(props.row.status) }}>
          <button
            style={{
              backgroundColor: "green",
              border: "none",
              width: "50%",
            }}
          >
            Approve
          </button>

          <button
            style={{
              backgroundColor: "red",
              border: "none",
              width: "50%",
            }}
          >
            Decline
          </button>
        </div>
      );
    },
  },
];
