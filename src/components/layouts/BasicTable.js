import React, { useMemo } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import { useActions } from '../hooks/useActions'
import FooterComponent from './FooterComponent'
const BasicTable = ({
  allUsers,
  setUserLevel,
  setDisplayC,
  user,
  column,
  type,
  getSingleProfile,
  getVerifieddetails,
  singleUserDeposit,
  getSingleWithdrawals,
  // getCurrentProfile,
  getAllUserTrades,
}) => {
  const columns =  column
  const data = allUsers
  const {
    //   getSingleProfile,
    //   getVerifieddetails,
    //   singleUserDeposit,
    getCurrentProfile,
    //   getSingleWithdrawals,
    //   getAllUserTrades,
  } = useActions()

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
  )

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
  } = tableInstance

  const { pageIndex, pageSize } = state
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}{' '}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? '  ⬇️'
                        : '   ⬆️'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            if (type === 'EveryUser') {
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    getSingleWithdrawals(row.original._id)
                    getCurrentProfile(row.original._id)

                    setDisplayC(true)
                    getSingleProfile(row.original)
                    singleUserDeposit(row.original._id)
                    getVerifieddetails(row.original)
                    getAllUserTrades(row.original._id)
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        style={{ maxHeight: '20px', height: '15px' }}
                        onClick={() => {
                          setUserLevel(
                            user.isAdmin
                              ? 'isAdmin'
                              : user.isManager
                              ? 'isManager'
                              : 'none',
                          )
                        }}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            } else if (type === 'deposit') {
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    // alert('from deposit')
                    // getSingleDepositFromtheList(row.original.id)
                    // getVerifieddetails(row.original)
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        style={{ maxHeight: '20px', height: '15px' }}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            } else {
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )
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
  )
}

export default BasicTable
