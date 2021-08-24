import React, { useMemo, useState } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import styled from 'styled-components'
import { Columns } from './TableHeader'

const BasicTable = ({ allUsers, setUserLevel, setDisplayC, user }) => {
  // // toggle for live trade
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(5)
  const [numUsers, setNumUsers] = useState([])
  // get current  posts
  // const indexOfLastPost = currentPage * postPerPage
  // const indexOfFirstPost = indexOfLastPost - postPerPage
  // const currentPosts = numUsers.slice(indexOfFirstPost, indexOfLastPost)
  // const paginate = (num) => setCurrentPage(num)
  const columns = useMemo(() => Columns, [])
  const data = useMemo(() => allUsers, [])
  const [toggle, setToggle] = useState()

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

      {/* <Pagination
        postPerPage={postPerPage}
        totalPosts={numUsers.length}
        paginate={paginate}
      /> */}

      {/* <nav className="d-flex justify-content-center  flex-column align-items-center mt-2">
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

          <span>
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
        </button>
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

      <span>
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of 
                  </strong>{' '}
                </span> */}

      <div
        className="d-flex justify-content-between"
        style={{ width: '100%', margin: 'auto' }}
      >
        <FooterStyle style={{ width: '50%', margin: 'auto' }}>
          <div className="list-footer">
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'white',
                boxShadow: '1px 0px 8px -3px rgba(0,0,0,0.52)',
                fontWeight: 600,
              }}
              className="btn"
              id="prev-page"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {'<'}
            </div>
            <div>
              <strong style={{ color: 'black', zIndex: 2 }}>
                <span id="current-page"> {pageIndex + 1}</span> of{' '}
                {pageOptions.length} <span id="total-pages"></span>{' '}
              </strong>
            </div>
            <div
              className="btn"
              id="next-page"
              onClick={() => nextPage()}
              disabled={!canNextPage}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'white',
                boxShadow: '1px 0px 8px -3px rgba(0,0,0,0.52)',
                fontWeight: 600,
              }}
            >
              {'>'}
            </div>
          </div>
        </FooterStyle>

        <div className="d-flex justify-content-start align-items-center mr-3">
          <div>
            <strong>
              <p
                className="mb-0"
                style={{
                  color: 'black',
                  zIndex: 2,
                  marginRight: '15px',
                  lineHeight: 2,
                }}
              >
                Show:{' '}
              </p>
            </strong>
          </div>
          <div
            className="mb-0"
            // style={{ background: 'white', color: '#0D6EFD' }}
          >
            <form>
              <select
                className="form-control form-control-sm"
                value={pageSize}
                // style={{ color: '#0D6EFD' }}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[10, 25, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize} className="page-link">
                    {pageSize} rows
                  </option>
                ))}
              </select>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(BasicTable)

const FooterStyle = styled.div`
  .list {
    list-style: none;
  }

  .list-item {
    padding: 1rem;
    box-shadow: -1px 5px 7px 1px rgba(164, 164, 164, 0.15);
    border-bottom: 1px solid #e7e7e7;
    animation: 0.5s fade ease-in-out;
  }

  .list-item > .item-title {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 0.25rem;
  }

  .list-item > .item-description {
    margin-bottom: 0.5rem;
  }

  .list-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: 'black';
    z-index: 1;
  }

  // .btn {
  //   padding: 0.5rem;
  //   border: none;
  //   font-size: 1rem;
  //   background: transparent;
  //   background: 'black';
  //   transition: background-color 0.3s ease;
  //   color: white;
  //   cursor: pointer;
  //   //border-radius: 4px;
  //   // display: grid;
  //   //place-items: cemter;
  // }

  .btn:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  @keyframes fade {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`
