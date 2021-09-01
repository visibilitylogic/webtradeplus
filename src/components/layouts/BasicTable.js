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
  // console.log(`columns`, allUsers);
  // console.log(`column`, column);
  const columns = useMemo(() => column, [column, type]);
  const data = useMemo(() => allUsers, [allUsers]);
  const { getSingleProfile, getVerifieddetails } = useActions();
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
                    getSingleWithdrawals(row.original._id);
                    getSingleProfile(row.original);
                    setDisplayC(true);
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
            } else if (type === "verifiedUsers" || type === "withdrawal") {
              console.log(`row.original`, row.oriiginal);
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
