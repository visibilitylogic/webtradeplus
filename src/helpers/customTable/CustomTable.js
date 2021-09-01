import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => {
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

  // const {allUsers} = useSelector(state => state.profile)

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
