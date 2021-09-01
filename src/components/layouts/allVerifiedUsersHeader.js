import { format } from "date-fns";
import AllUser from "./AllUser.js";
import DocumentFile from "./DocumentFile.js";
import ApproveDoc from "./ApproveDoc";
export const allVerifiedUsersHeader = [
  {
    Header: "name",
    headerName: "User",
    width: 180,
    accessor: "name",
  },
  {
    Header: "time",
    headerName: "Submitted Date",
    width: 180,
    accessor: "time",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },

  {
    Header: "status",
    headerName: "Status",
    width: 180,
    accessor: ({ status }) => (
      <p
        className={
          status === "Pending"
            ? "bg-danger text-light  text-center"
            : "bg-success text-light  text-center "
        }
      >
        {status}
      </p>
    ),
  },

  {
    id: "documentFile",
    Header: "documentFile",
    headerName: "Identity Info",
    width: 180,
    accessor: ({ documentFile }) => (
      <DocumentFile documentFile={documentFile} />
    ),
  },
  {
    Header: "proofDocument",
    headerName: "Documents",
    width: 180,
    accessor: (proofDocument) => (
      <AllUser proofDocument={proofDocument} />
      // <div className="d-flex justify-content-center align-items-center"></div>
    ),
  },
  {
    Header: "Action",
    headerName: "Action",
    accessor: (status) => <ApproveDoc status={status} />,
  },
];
