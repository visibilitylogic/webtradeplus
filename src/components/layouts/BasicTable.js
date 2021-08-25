import React, { useMemo } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'

import FooterComponent from './FooterComponent'

const BasicTable = ({
  allUsers,
  setUserLevel,
  setDisplayC,
  user,
  column,
  type,
}) => {
  const columns = useMemo(() => column, [])
  const data = useMemo(() => allUsers, [])

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
                    setDisplayC(true)
                    setUserLevel(
                      user.isAdmin
                        ? 'isAdmin'
                        : user.isManager
                        ? 'isManager'
                        : 'none',
                    )
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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

export default React.memo(BasicTable)
