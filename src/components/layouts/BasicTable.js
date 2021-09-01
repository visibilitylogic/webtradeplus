import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
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
  const {
    getSingleProfile,
    getVerifieddetails,
    singleUserDeposit,
    getSingleWithdrawals,
    getAllUserTrades,
  } = useActions();
  const columns = useMemo(
    () => column,
    [
      column,
      type,
      getSingleProfile,
      getVerifieddetails,
      singleUserDeposit,
      getSingleWithdrawals,
    ]
  );
  const data = useMemo(
    () => allUsers,
    [
      allUsers,
      type,
      getSingleProfile,
      getVerifieddetails,
      singleUserDeposit,
      getSingleWithdrawals,
    ]
  );
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
                    getSingleProfile(row.original);
                    setDisplayC(true);
                    singleUserDeposit(row.original._id);
                    getVerifieddetails(row.original);
                    getSingleWithdrawals(row.original._id);
                    getAllUserTrades(row.original._id);
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        style={{
                          maxHeight: "20px",
                          height: "15px",
                          cursor: "pointer",
                        }}
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
            } else if (
              type === "singlepayment" ||
              type === "verifiedUsers" ||
              type === "withdrawal"
            ) {
              return (
                <tr {...row.getRowProps()}>
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
                    console.log(`row.original`, row);
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
