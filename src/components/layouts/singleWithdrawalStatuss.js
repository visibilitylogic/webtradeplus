import { format } from "date-fns";
import React from "react";

export const singleUserWithdrawal = [
  {
    field: "user",
    width: 180,
    type: "text",
    headerName: "User",
    // accessor: 'user',
  },

  {
    field: "Ref",
    width: 180,
    headerName: "Ref",
    type: "text",
    // accessor: 'Ref',
  },
  {
    field: "time",
    width: 180,
    headerName: "Created Date",
    type: "time",
    accessor: "time",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    field: "status",
    width: 180,
    type: "text",
    headerName: "Status",
    accessor: "status",
  },
  {
    field: "Amount Paid",
    width: 180,
    headerName: "Amount Paid",
    accessor: "",
  },
  {
    field: "fees",
    width: 180,
    headerName: "Fees",
    type: "number",
    accessor: "fees",
  },
  {
    field: "amount",
    width: 180,
    headerName: "Wallet Received",
    accessor: "amount",
  },

  {
    field: "Amount Recieved",
    width: 180,
    headerName: "Amount Received",
    accessor: "",
  },
  {
    field: "Payment Gateway",
    width: 180,
    headerName: "Payment Gateway",
    accessor: "",
  },
  {
    field: "Proof",
    width: 180,
    headerName: "Proof",
    accessor: "",
  },

  {
    field: "status",
    width: 180,
    headerName: "Action",
    accessor: "action",
  },
];
