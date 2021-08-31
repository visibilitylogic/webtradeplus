import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { getSingleWithdrawals } from "../../store/action-creators/profileActions";
import { useActions } from "../hooks/useActions";

import FooterComponent from "./FooterComponent";
const BasicTable = ({
  allUsers,
  setUserLevel,
  setDisplayC,
  user,
  column,
  type,
}) => {
<<<<<<< HEAD
  const columns = useMemo(() => column, [column, type])
  const data = useMemo(() => allUsers, [allUsers])
  const { getSingleProfile, getVerifieddetails } = useActions()
=======
  const columns = useMemo(() => column, [column]);
  const data = useMemo(() => allUsers, [allUsers]);
  const { getCurrentProfile, getVerifieddetails } = useActions();
>>>>>>> 951ecff9a11eeebd38ac65ba9ca903335b70e68c
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setPageSize,
    previousPage,
    page,
    prepareRow,
  } = tableInstance;

  const { pageIndex, pageSize } = state;
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}{" "}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? "  ⬇️"
                        : "   ⬆️"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            if (type === "EveryUser") {
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
<<<<<<< HEAD
                    getSingleWithdrawals(row.original._id)
                    getSingleProfile(row.original)
                    setDisplayC(true)
=======
                    getSingleWithdrawals(row.original._id);
                    getCurrentProfile(row.original._id);
                    setDisplayC(true);
>>>>>>> 951ecff9a11eeebd38ac65ba9ca903335b70e68c
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
<<<<<<< HEAD
                        style={{
                          maxHeight: '20px',
                          height: '15px',
                          cursor: 'pointer',
                        }}
=======
                        style={{ maxHeight: "20px", height: "15px" }}
>>>>>>> 951ecff9a11eeebd38ac65ba9ca903335b70e68c
                        onClick={() => {
                          setUserLevel(
                            user.isAdmin
                              ? "isAdmin"
                              : user.isManager
                              ? "isManager"
                              : "none"
                          );
                        }}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            } else if (type === "verifiedUsers" || type === "withdrawal") {
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    getVerifieddetails(row.original);
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        style={{ maxHeight: "20px", height: "15px" }}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            } else {
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      <FooterComponent
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageSize={pageSize}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageIndex={pageIndex}
        nextPage={nextPage}
      />
    </>
  );
};

export default React.memo(BasicTable);
