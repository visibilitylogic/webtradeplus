import React, { useState } from 'react'

const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((num) => {
          return (
            <li key={num} className="page-item">
              <a
                href="!"
                onClick={() => {
                  paginate(num)
                  this.className.add('active')
                  console.log(this)
                }}
                className="page-link"
              >
                {num}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Pagination
