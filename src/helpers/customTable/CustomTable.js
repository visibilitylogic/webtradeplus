import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { PROCESS_DEPOSIT } from "../../store/action-types";
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomUpdatedDate,
// } from "@material-ui/x-grid-data-generator";

const useStyles = makeStyles((theme) => {
  // const backgroundColor =
  //   getThemePaletteMode(theme.palette) === "dark"
  //     ? "#376331"
  //     : "rgb(217 243 190)";
  return {
    root: {
      backgroundColor: "#fff",
      "& .MuiDataGrid-cellEditable": {
        backgroundColor: "#fff",
      },
    },
  };
});

const CustomTable = ({
  allUsers,
  setUserLevel,
  setDisplayC,
  user,
  column,
  type,
}) => {
  console.log(`allUsers`, allUsers);
  const dataRows = allUsers.map(
    (value) => value.userId && { ...value, id: value.userId, width: "100%" }
  );

  const classes = useStyles();
  const [pageSize, setPageSize] = React.useState(5);
  const dispatch = useDispatch();
  // const {allUsers} = useSelector(state => state.profile)

  const handleCellEditCommit = React.useCallback(({ id, field, value }) => {
    if (field === "fullName") {
      const [firstName, lastName] = value.toString().split(" ");
      const updatedRows = dataRows.map((row) => {
        if (row.id === id) {
          return { ...row, firstName, lastName };
        }
        return dataRows;
      });

      dispatch({ type: PROCESS_DEPOSIT, payload: updatedRows });
    }
  }, []);

  console.log(`dataRows`, dataRows);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        className={classes.root}
        rows={dataRows}
        columns={column}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
    </div>
  );
};

export default CustomTable;
