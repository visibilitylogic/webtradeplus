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
        className="d-flex justify-content-between"
        style={{ width: '100%', margin: 'auto' }}
      >
        <FooterStyle style={{ width: '50%', margin: 'auto' }}>
          <div className="list-footer">
            <div
              className="btn-container"
              id="prev-page"
              onClick={() => previousPage}
              disabled={!canPreviousPage}
            >
              {'<'}
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
              onClick={() => nextPage}
              disabled={!canNextPage}
              style={{}}
            >
              {'>'}
            </div>
          </div>
        </FooterStyle>
        <FooterStyle2>
          <div className=" d-flex justify-content-start align-items-center mr-3">
            <div className="p-container">
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
    color: black;
    z-index: 1;
  }

  .list-footer > .btn-container {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    box-shadow: 1px 0px 8px -3px rgba(0, 0, 0, 0.52);
    font-weight: 600;
  }
  strong.strong {
    color: black;
    zindex: 2;
  }

  .btn-container:hover {
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
