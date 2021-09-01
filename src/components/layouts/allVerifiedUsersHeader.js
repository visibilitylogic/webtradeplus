// import { format } from "date-fns";
import AllUser from "./AllUser.js";
// import DocumentFile from "./DocumentFile.js";
// import ApproveDoc from "./ApproveDoc";

const checkIfApproved = (status) => {
  return status === "Approved" ? "none" : "block";
};

export const allVerifiedUsersHeader = [
  {
    field: "name",
    headerName: "User",
    width: 180,
    type: "text",
    accessor: "name",
  },
  {
    field: "time",
    headerName: "Submitted Date",
    width: 180,
    type: "time",
    accessor: "time",
    // Cell: ({ value }) => {
    //   return format(new Date(value), "dd/MM/yyyy");
    // },
  },

  {
    field: "status",
    headerName: "Status",
    width: 180,
    type: "text",
    renderCell: (props) => {
      return (
        <p
          className={
            props.row.status === "Pending"
              ? "bg-danger text-light  text-center w-100"
              : "bg-success text-light  text-center w-100"
          }
        >
          {props.row.status}
        </p>
      );
    },
    // accessor: ({ status }) => (
    //   <p
    //     className={
    //       status === "Pending"
    //         ? "bg-danger text-light  text-center"
    //         : "bg-success text-light  text-center "
    //     }
    //   >
    //     {status}
    //   </p>
    // ),
  },

  {
    id: "documentFile",
    field: "documentFile",
    headerName: "Identity Info",
    width: 180,
    type: "text",
    // accessor: ({ documentFile }) => (
    //   <DocumentFile documentFile={documentFile} />
    // ),
  },
  {
    field: "proofDocument",
    headerName: "Documents",
    width: 180,
    type: "text",
    // accessor: (proofDocument) => (
    //   <AllUser proofDocument={proofDocument} />
    // <div className="d-flex justify-content-center align-items-center"></div>
    // ),
  },
  {
    field: "Action",
    headerName: "Action",
    width: 180,
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
            Accept
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
    // accessor: (status) => <ApproveDoc status={status} />,
  },
];
