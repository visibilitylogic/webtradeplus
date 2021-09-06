import React from 'react'

function WithdrawalMethod({ methodDetails }) {
  console.log(methodDetails)
  console.log(methodDetails.methodDetails)
  return (
    <div>
      csc
      {/* {methodDetails.methodDetails.map((item, index) => (
        <p key={index}>{item}</p>
      ))} */}
    </div>
  )
}

export default WithdrawalMethod
