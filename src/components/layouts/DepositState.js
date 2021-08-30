import React, { useState, useEffect } from 'react'

function DepositState({ status }) {
  const [pendingState, set] = useState(status)

  // useEffect(() => {
  //   set(status)
  // }, [pendingState])

  console.log(pendingState)
  return (
    <a
      className={
        status === 'Declined' || status === 'Pending'
          ? ' bg-danger text-light  text-center'
          : 'bg-success text-light  text-center'
      }
    >
      {status === 'Approved'
        ? 'Approved'
        : pendingState === 'Declined'
        ? 'Declined'
        : 'Pending'}
    </a>
  )
}

export default DepositState
