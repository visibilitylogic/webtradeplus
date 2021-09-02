import { format } from "date-fns";
import UpdateOrderComponent from "./util/UpdateOrderComponent";
export const allTradesHeader = [
  {
    field: "_id",
    headerName: "Ref",
    width: 180,
    type: "text",
    accessor: "_id",

    // accessor: ({ _id }) => <p>{_id.slice(3, 8)}</p>,
  },
  {
    field: "isOpen",
    headerName: "Active",
    width: 180,
    renderCell: (props) => {
      <p
        className={
          props.row.isOpen === true
            ? " text-center bg-success text-light"
            : " text-center bg-denger text-light"
        }
      >
        {props.row.isOpen === true ? "true" : "false"}
      </p>;
    },

    // accessor: "isOpen",
    // accessor: ({ isOpen }) => (
    //   <p
    //     className={
    //       isOpen === true
    //         ? " text-center bg-success text-light"
    //         : " text-center bg-denger text-light"
    //     }
    //   >
    //     {isOpen === true ? "true" : "false"}
    //   </p>
    // ),
  },

  {
    field: "tag",
    headerName: "Type",
    width: 180,
    type: "text",
    renderCell: (props) => {
      <p
        className={
          props.row.tag === "buy"
            ? " text-center bg-success text-light"
            : " text-center bg-denger text-light"
        }
      >
        {props.row.tag}
      </p>;
    },
    // accessor: "tag",
    // accessor: ({ tag }) => (
    //   <p
    //     className={
    //       tag === "buy"
    //         ? " text-center bg-success text-light"
    //         : " text-center bg-denger text-light"
    //     }
    //   >
    //     {tag}
    //   </p>
    // ),
  },
  {
    field: "margin",
    headerName: "Margin",
    width: 180,
    type: "number",

    // accessor: "margin",
  },
  {
    field: "profit",
    headerName: "Profit",
    width: 180,
    type: "number",
    renderCell: (props) => {
      <p className={" text-center bg-success text-light"}>
        {props.row.profit}
      </p>;
    },
    // accessor: "profit",
    // accessor: ({ profit }) => (
    //   <p className={" text-center bg-success text-light"}>{profit}</p>
    // ),
  },
  {
    field: "loss",
    headerName: "Loss",
    width: 180,
    type: "number",
    renderCell: (props) => {
      <p className={" text-center bg-danger text-light"}>{props.row.loss}</p>;
    },
    // accessor: "loss",
    // accessor: ({ loss }) => (

    // ),
  },
  {
    field: "takeProfit",
    headerName: "Take Profit",
    width: 180,
    type: "number",

    // accessor: "takeProfit",
  },
  {
    field: "takLoss",
    headerName: "Stop Loss",
    type: "number",
    width: 180,

    // accessor: "takeLoss",
  },
  {
    field: "nameOfAsset",
    headerName: "Name Of Assest",
    width: 180,
    type: "text",
    // accessor: "nameOfAsset",
  },
  {
    field: "typeOfAsset",
    headerName: "Type Of Assest",
    width: 180,
    type: "text",

    // accessor: "typeOfAsset",
  },
  {
    field: "openRateOfAsset",
    headerName: "Open Rate",
    width: 180,
    type: "number",
    // accessor: "openRateOfAsset",
  },
  {
    field: "closeRateOfAsset",
    headerName: "Close Rate",
    width: 180,

    // accessor: "closeRateOfAsset",
  },

  {
    field: "time",
    headerName: "Time",
    width: 180,
    type: "time",

    // accessor: "time",
    // Cell: ({ value }) => {
    //   return format(new Date(value), "dd/MM/yyyy");
    // },
  },
  {
    field: "action",
    headerName: "Action",
    width: 180,
    renderCell: (props) => {
      return <UpdateOrderComponent props={props.row} />;
    },
    // accessor: "icon",
    // accessor: ({ _id }) => (
    //   <button className={" text-center bg-primary text-light"}>{"EDIT"}</button>
    // ),
  },
];
