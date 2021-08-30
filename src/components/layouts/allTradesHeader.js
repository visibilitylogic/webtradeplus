import { format } from "date-fns";
export const allTradesHeader = [
  {
    Header: "Ref",
    accessor: "_id",
    accessor: ({ _id }) => <p>{_id.slice(3, 8)}</p>,
  },
  {
    Header: "Active",
    accessor: "isOpen",
    accessor: ({ isOpen }) => (
      <p
        className={
          isOpen === true
            ? " text-center bg-success text-light"
            : " text-center bg-denger text-light"
        }
      >
        {isOpen === true ? "true" : "false"}
      </p>
    ),
  },

  {
    Header: "type",
    accessor: "tag",
    accessor: ({ tag }) => (
      <p
        className={
          tag === "buy"
            ? " text-center bg-success text-light"
            : " text-center bg-denger text-light"
        }
      >
        {tag}
      </p>
    ),
  },
  {
    Header: "Margin",
    accessor: "margin",
  },
  {
    Header: "Profit",
    accessor: "profit",
  },
  {
    Header: "Loss",
    accessor: "loss",
  },
  {
    Header: "Take Profit",
    accessor: "takeProfit",
  },
  {
    Header: "Stop Loss",
    accessor: "takeLoss",
  },
  {
    Header: "Name Of Assest",
    accessor: "nameOfAsset",
  },
  {
    Header: "Type Of Assest",
    accessor: "typeOfAsset",
  },
  {
    Header: "Open Rate Of Assest",
    accessor: "openRateOfAsset",
  },
  {
    Header: "Close Rate Of Assest",
    accessor: "closeRateOfAsset",
  },

  {
    Header: "Time",
    accessor: "time",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Action",
    accessor: "icon",
    accessor: ({ _id }) => (
      <button className={" text-center bg-primary text-light"}>{'EDIT'}</button>
    ),
  },
];
