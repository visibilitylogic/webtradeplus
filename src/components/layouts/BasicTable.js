import React, { useMemo } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import { Columns } from './TableHeader'

const BasicTable = ({ allUsers, setUserLevel, setDisplayC, user }) => {
  const columns = useMemo(() => Columns, [])
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
    gotoPage,
    pageCount,
    previousPage,
    allColumns,
    getToggleHideAllColumnsProps,
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
                    {column.isSorted ? (column.isSortedDesc ? '⬆️' : '⬇️') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
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
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="d-flex justify-content-center  flex-column align-items-center mt-2">
        <div>
          <ul className="pagination pagination-lg ">
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </a>
            </li>

            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span>
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}{' '}
                  </strong>{' '}
                </span>
              </a>
            </li>

            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span>
                  Go to page:{' '}
                  <input
                    style={{ textAlign: 'center' }}
                    type="number"
                    onChange={(e) => {
                      const pageNumber = e.target.value
                        ? Number(e.target.value) - 1
                        : 0
                      gotoPage(pageNumber)
                    }}
                    defaultValue={pageIndex + 1}
                    style={{ width: '50px' }}
                  />
                </span>
              </a>
            </li>

            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>

          {/* <span>
          Page{' '}
          <strong>
            {pageIndex + 1}of {pageOptions.length}{' '}
          </strong>{' '}
        </span>

        <span>
          | Go to page:{' '}
          <input
            type="number"
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
              // className = 'form-control'
            }}
            defaultValue={pageIndex + 1}
            style={{ width: '50px' }}
          />
        </span>
        <select
          value={pageSize}
          // className="form-control  form-control-sm"
          onChange={(e) => setPageSize(Number(e.target.value))}
          style={{ width: '70px' }}
        >
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {' '}
              show {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canNextPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canNextPage}>
          Previous
        </button>

        <button onClick={() => nextPage()} disabled={!canPreviousPage}>
          Next
        </button>

        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canPreviousPage}
        >
          {'>>'}
        </button> */}
        </div>

        <div
          className="mt-2 pagination pagination-lg"
          style={{ background: 'white', color: '#0D6EFD' }}
        >
          <form>
            <select
              className="page-item form-select form-select-lg"
              value={pageSize}
              style={{ color: '#0D6EFD' }}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize} className="page-link">
                  Show {pageSize}
                </option>
              ))}
            </select>
          </form>
        </div>
      </nav>
    </>
  )
}

export default React.memo(BasicTable)
