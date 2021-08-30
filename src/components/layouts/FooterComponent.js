import React from 'react'
import styled from 'styled-components'
const FooterComponent = ({
  canPreviousPage,
  previousPage,
  setPageSize,
  pageSize,
  canNextPage,
  pageOptions,
  pageIndex,
  nextPage,
}) => {
  return (
    <>
      <div
        className="d-flex justify-content-between mb-3 align-items-center"
        style={{
          width: '100%',

          background: 'white',
          padding: '0 0 20px 0 0',
        }}
      >
        <FooterStyle style={{ width: '50%', margin: '0 auto' }}>
          <div className="list-footer">
            <div
              className="btn-container"
              id="prev-page"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              ◀
            </div>
            <div>
              <strong className="strong">
                <span id="current-page"> {pageIndex + 1}</span> of{' '}
                {pageOptions.length} <span id="total-pages"></span>{' '}
              </strong>
            </div>
            <div
              className="btn-container"
              id="next-page"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              ▶
            </div>
          </div>
        </FooterStyle>
        <FooterStyle2>
          <div className=" d-flex justify-content-start align-items-center mr-3">
            <div className="p-container align-self-flex-start">
              <strong>
                <p className="p mb-0">Show: </p>
              </strong>
            </div>
            <div className="mb-0">
              <form>
                <select
                  className="form-control form-control-sm"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[10, 25, 50, 100].map((pageSize) => (
                    <option
                      key={pageSize}
                      value={pageSize}
                      className="page-link"
                    >
                      {pageSize} rows
                    </option>
                  ))}
                </select>
              </form>
            </div>
          </div>
        </FooterStyle2>
      </div>
    </>
  )
}

export default FooterComponent

/********************************STYLES USING STYLED COMPONENTS***********************************************************/

const FooterStyle2 = styled.div`
  .p-container > strong > p.p {
    color: black;
    zindex: 2;
    margin-right: 15px;
    lineheight: 2;
  }
`

const FooterStyle = styled.div`
  .list {
    list-style: none;
  }

  .list-item {
    padding: 0 1rem;
    box-shadow: -1px 5px 7px 1px rgba(164, 164, 164, 0.15);
    border-bottom: 1px solid #e7e7e7;
    animation: 0.5s fade ease-in-out;
  }

  .list-item > .item-title {
    font-size: 1.2rem;
    font-weight: 400;
  }

  .list-item > .item-description {
  }

  .list-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: black;
    z-index: 1;
  }

  .list-footer > .btn-container {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    box-shadow: 1px 0px 8px -3px rgba(0, 0, 0, 0.52);
    font-weight: 600;
    cursor: pointer;
  }
  strong.strong {
    z-index: 2;
    line-height: 2;
    color: #2727c1;
    font-size: 1.3rem;
  }

  .btn-container:hover {
    background-color: #2727c1;
    color: white !important;
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
